import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFetchMyWardsQuery, useSearchWardsQuery } from '@@/services/user';
import StandardInput from '@@/components/Inputs/StandardInput';
import WardCard from '@@/components/Cards/WardCard';
import Loader from '@@/components/Loader';

const MIN_SEARCH_LENGTH = 3;

const schema = yup
  .object({
    name: yup
      .string()
      .min(
        MIN_SEARCH_LENGTH,
        `Le nom doit contenir au moins ${MIN_SEARCH_LENGTH} caractères`,
      )
      .required("Veuillez entrer le nom d'un patient"),
  })
  .required();

const DashboardPage: React.FC = () => {
  const { data: wards, isLoading: wardsAreLoading } = useFetchMyWardsQuery();

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<{
    name: string;
  }>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
    },
  });

  const name = watch('name');
  const { data: searchedWards } = useSearchWardsQuery(name, {
    skip: name?.length < MIN_SEARCH_LENGTH,
  });

  const selectedWards = useMemo(() => {
    if (name?.length < MIN_SEARCH_LENGTH) {
      return wards;
    }

    return searchedWards;
  }, [searchedWards, wards, name]);

  const wardsSection = useMemo(() => {
    if (wardsAreLoading) {
      return (
        <div className="m-8 flex flex-row items-center justify-center w-full">
          <Loader />
          <p className="ml-2 font-main text-main text-lg">Chargement...</p>
        </div>
      );
    }

    return (
      <div className="mt-8">
        {selectedWards?.map((ward) => (
          <WardCard key={ward._id} ward={ward} />
        ))}
      </div>
    );
  }, [selectedWards, wardsAreLoading]);

  return (
    <div className="w-full m-4 mt-8">
      <div className="flex flex-row justify-between items-center">
        <div className="w-96">
          <StandardInput
            register={register}
            id="name"
            label="Rechercher un protégé"
            type="text"
            placeholder="Rechercher un protégé"
            error={errors.name}
          />
        </div>
        <div className="flex flex-row space-x-4">
          <Link
            to="/wards/new"
            className="bg-cyan-400 rounded-lg p-2 flex flex-row items-center"
          >
            <IoIosAddCircleOutline size={24} color="white" />
            <span className="text-white ml-1">Nouveau protégé</span>
          </Link>
        </div>
      </div>

      {wardsSection}
    </div>
  );
};

export default DashboardPage;
