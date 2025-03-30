import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cx from 'classnames';
import toast from 'react-hot-toast';
import omit from 'lodash.omit';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetUserQuery, usePatchUserMutation } from '@@/services/user';
import { useViewDocumentQuery } from '@@/services/document';
import {
  selectInputGenders,
  selectInputMaritalStatuses,
} from '@@/constants/user';
import { selectInputMeasureTypes } from '@@/constants/measure';
import { BsArrowLeft } from 'react-icons/bs';
import DashboardSection from '@@/components/DashboardSection';
import WardForm, { schema, WardFormType } from '@@/components/Forms/WardForm';
import MeasureForm from '@@/components/Forms/MeasureForm';
import PasswordForm from '@@/components/Forms/PasswordForm';
import InventoryForm from '@@/components/Forms/InventoryForm';
import DocumentSection from '@@/components/DocumentSection';
import BridgeSection from '@@/components/BridgeSection';
import OperationalReportSection from '@@/components/OperationalReportSection';

enum Tabs {
  DASHBOARD = 'dashboard',
  CONVERSATIONS = 'messagerie',
  INFO = 'info',
  MEASURES = 'mesures',
  FINANCE = 'finance',
  INVENTORY = 'inventaire',
  DOCUMENTS = 'documents',
  PASWWORDS = 'passwords',
  OPERATIONAL_REPORT = 'operational_report',
}

const translateTab = (tab: string) => {
  switch (tab) {
    case Tabs.DASHBOARD:
      return 'Dashboard';
    case Tabs.INFO:
      return 'Informations';
    case Tabs.MEASURES:
      return 'Mesures';
    case Tabs.FINANCE:
      return 'Finance';
    case Tabs.INVENTORY:
      return 'Inventaire';
    case Tabs.PASWWORDS:
      return 'Mots de passe';
    case Tabs.DOCUMENTS:
      return 'Documents';
    case Tabs.OPERATIONAL_REPORT:
      return 'Rapport de gestion';

    default:
      return tab;
  }
};

const Tab: React.FC<{
  id: string;
  title: string;
  isActive: boolean;
  cb: Function;
}> = ({ id, isActive, title, cb }) => {
  return (
    <button
      id={id}
      onClick={() => {
        cb(id);
        window.location.hash = id;
      }}
    >
      <span
        className={cx(
          'font-semibold text-sm',
          isActive ? 'text-sky-500' : 'text-slate-700',
        )}
      >
        {title}
      </span>
    </button>
  );
};

const WardDashboardPage: React.FC<{ wardId: string }> = ({ wardId }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(Tabs.DASHBOARD);
  const { data: ward } = useGetUserQuery(wardId, {
    skip: !wardId,
  });

  const { data: photoUrl } = useViewDocumentQuery(ward?.photoDocumentId || '', {
    skip: !ward?.photoDocumentId,
  });

  const [patchUser, { isSuccess }] = usePatchUserMutation();

  const form = useForm<WardFormType>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = useCallback(
    (data: Partial<WardFormType>) => {
      patchUser({
        ...data,
        gender: data.gender?.id,
        maritalStatus: data.maritalStatus?.id,
        measures: data.measures?.map((m: any) => ({
          ...m,
          type: m.type.id,
        })),
        photo:
          typeof data.photo !== 'string' && data.photo?.length
            ? data.photo[0]
            : undefined,
      });
    },
    [patchUser],
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Le protégé a bien été modifié`, {
        position: 'top-right',
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (ward) {
      const data = omit(ward, [
        'role',
        '_id',
        'guardianId',
        'photoDocumentId',
        'isDeleted',
        'createdAt',
        'updatedAt',
      ]);

      form.reset({
        ...data,
        photo: photoUrl,
        gender: selectInputGenders.find((g) => g.id === data.gender),
        maritalStatus: selectInputMaritalStatuses.find(
          (g) => g.id === data.maritalStatus,
        ),
        measures: data.measures?.map((m: SH.Measure) => ({
          ...m,
          type: selectInputMeasureTypes.find((t) => t.id === m.type),
        })),
      });
    }
  }, [ward, form.reset, photoUrl]);

  useEffect(() => {
    if (location?.hash) {
      setActiveTab(location.hash.replace('#', '') as Tabs);
    }
  }, [location?.hash, setActiveTab]);

  const content = () => {
    switch (activeTab) {
      case Tabs.DASHBOARD:
        return <DashboardSection wardId={wardId} />;
      case Tabs.INFO:
        return <WardForm form={form} isNew={false} />;
      case Tabs.INVENTORY:
        return <InventoryForm form={form} />;
      case Tabs.MEASURES:
        return <MeasureForm form={form} />;
      case Tabs.FINANCE:
        return <BridgeSection userId={wardId} />;
      case Tabs.PASWWORDS:
        return <PasswordForm form={form} />;
      case Tabs.DOCUMENTS:
        return <DocumentSection userId={wardId} />;
      case Tabs.OPERATIONAL_REPORT:
        return <OperationalReportSection wardId={wardId} />;
      default:
        return null;
    }
  };

  if (!ward) {
    return null;
  }

  return (
    <div className="w-full p-4">
      {![
        Tabs.FINANCE,
        Tabs.DASHBOARD,
        Tabs.DOCUMENTS,
        Tabs.OPERATIONAL_REPORT,
      ].includes(activeTab) && (
        <div className="z-10 right-6 top-12 fixed">
          <button
            type="button"
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            className="bg-sky-600 rounded-md p-1"
          >
            <span className="text-white ml-1">Valider</span>
          </button>
        </div>
      )}

      <div className="p-4">
        <Link to={'/wards'}>
          <BsArrowLeft size={20} className="mb-1" />
        </Link>
        <h2 className="text-slate-700 text-lg font-semibold">
          {ward.firstName} {ward.lastName}
        </h2>
        <div className="flex flex-row items-center space-x-6 border-b border-slate-200 pb-2 mt-4">
          {Object.values(Tabs).map((tab) => {
            if (tab === Tabs.CONVERSATIONS) {
              return (
                <Link
                  key={tab}
                  to={`/wards/${wardId}/conversations`}
                  className="font-semibold text-sm text-slate-700"
                >
                  Messagerie
                </Link>
              );
            }
            return (
              <Tab
                key={tab}
                id={tab}
                title={translateTab(tab)}
                isActive={activeTab === tab}
                cb={setActiveTab}
              />
            );
          })}
        </div>
        {content()}
      </div>
    </div>
  );
};

export default WardDashboardPage;
