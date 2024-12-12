export default [
  {
    id: 128,
    name: 'Fortuneo',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/fortuneo.png',
    },
    capabilities: ['aggregation', 'single_payment', 'instant_single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c'],
    },
  },
  {
    id: 416,
    name: 'BNP Paribas Privée',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/bnp.png',
    },
    group_name: 'BNP',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c'],
    },
  },
  {
    id: 1510,
    name: 'UBS',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/de/ubs-de-20240828082851.png',
    },
    group_name: 'UBS',
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {},
  },
  {
    id: 16,
    name: 'Crédit Mutuel - Site National',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditmutuel.png',
    },
    group_name: 'Crédit Mutuel',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
      'bulk_payment_scheduled',
      'bulk_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 78,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 584,
    name: 'Natixis Corporate And Investment Banking (CIB)',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/natixis-corporate-20230510070445.png',
    },
    group_name: 'Natixis',
    capabilities: [
      'aggregation',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 422,
    name: 'Revolut',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/gb/revolut.png',
    },
    group_name: 'Revolut',
    capabilities: ['aggregation', 'single_payment', 'instant_single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 35,
      multiple_dates_payments: false,
      sender_iban_available: false,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c'],
    },
  },
  {
    id: 452,
    name: 'Revolut Business FR',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/gb/revolut.png',
    },
    group_name: 'Revolut',
    capabilities: ['aggregation', 'single_payment', 'instant_single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 35,
      multiple_dates_payments: false,
      sender_iban_available: false,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 172,
    name: 'BNP Paribas Pro',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/bnp.png',
    },
    group_name: 'BNP',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 699,
    name: 'Nef Pro',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/nef-pro.png',
    },
    group_name: '',
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 129,
    name: 'ING Wholesale Banking',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/ingdirect.png',
    },
    group_name: 'ING',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 490,
    name: 'Wise',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/gb/log_and_exit-20230531065519.png',
    },
    group_name: 'Wise',
    capabilities: ['aggregation', 'single_payment', 'instant_single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: false,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 130,
    name: 'Crédit Mutuel de Bretagne',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/credit-mutuel-bretagne.png',
    },
    group_name: 'Crédit Mutuel Arkéa',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'instant_single_payment',
      'single_payment_scheduled',
      'bulk_payment',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 500,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['cmb'],
      segment: ['b2c', 'b2b'],
      region: ['Bretagne'],
    },
  },
  {
    id: 74,
    name: 'Crédit Agricole Normandie Seine',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Normandie Seine'],
    },
  },
  {
    id: 70,
    name: 'Crédit Agricole Morbihan',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Morbihan'],
    },
  },
  {
    id: 120,
    name: 'Crédit Agricole Val de France',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Val de France'],
    },
  },
  {
    id: 3111,
    name: 'Pliant FR',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/pliant-20240911082246.png',
    },
    group_name: 'Pliant',
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 122,
    name: 'BoursoBank',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/boursorama-20231005131500.png',
    },
    capabilities: [
      'account_check',
      'aggregation',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 50,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['boursorama'],
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 3273,
    name: 'BCI - Banque Calédonienne d’Investissement',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/bci-20241014072355.png',
    },
    group_name: '',
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 296,
    name: 'Banque SBE',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/banquepopulaire-dsp2.png',
    },
    capabilities: ['aggregation', 'account_check'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 126,
    name: 'American Express',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/americanexpress.png',
    },
    group_name: 'American Express',
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['amex'],
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 152,
    name: 'LCL Particuliers',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/lcl.png',
    },
    group_name: 'LCL',
    capabilities: [
      'account_check',
      'aggregation',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: false,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['crédit lyonnais'],
      segment: ['b2c'],
    },
  },
  {
    id: 624,
    name: "Caisse d'Epargne Pro - Banxo Hauts de France",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Professionnels - Banxo",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Hauts de France'],
    },
  },
  {
    id: 79,
    name: 'Crédit Agricole Toulouse 31',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Toulouse 31'],
    },
  },
  {
    id: 587,
    name: 'BNP Antilles Guyane',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/bnp.png',
    },
    group_name: 'BNP',
    capabilities: ['aggregation', 'account_check'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Antilles Guyane'],
    },
  },
  {
    id: 610,
    name: "Caisse d'Epargne Pro - Banxo  Provence Alpes Corse",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Professionnels - Banxo",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['reunion', 'martinique', 'guadeloupe', 'guyane'],
      segment: ['b2b'],
      region: ['Provence Alpes Corse'],
    },
  },
  {
    id: 588,
    name: 'BNP Nouvelle-Calédonie',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/bnp.png',
    },
    group_name: 'BNP',
    capabilities: ['aggregation', 'account_check'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Nouvelle-Calédonie'],
    },
  },
  {
    id: 592,
    name: 'BNP Connexis',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/bnp.png',
    },
    group_name: 'BNP',
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 591,
    name: 'Propulse By CA',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/propulsebyca-20230623141146.png',
    },
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 438,
    name: "Caisse d'Epargne Particuliers - Banxo Provence Alpes Corse",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Particuliers - Banxo",
    capabilities: ['aggregation', 'account_check'],
    payment_metadata: {
      release_status: 'retired',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'degraded',
      },
    },
    tags: {
      keywords: ['reunion', 'martinique', 'guadeloupe', 'guyane'],
      segment: ['b2c', 'b2b'],
      region: ['Provence Alpes Corse'],
    },
  },
  {
    id: 583,
    name: 'BNP Reunion',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/bnp.png',
    },
    group_name: 'BNP',
    capabilities: ['aggregation', 'account_check'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Réunion'],
    },
  },
  {
    id: 114,
    name: 'Crédit Agricole Alsace Vosges',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Alsace Vosges'],
    },
  },
  {
    id: 282,
    name: 'SG Entreprises',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/societegenerale.png',
    },
    group_name: 'SG',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['Société Générale'],
      segment: ['b2b'],
    },
  },
  {
    id: 145,
    name: 'SG Pro',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/societegenerale.png',
    },
    group_name: 'SG',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['Société Générale'],
      segment: ['b2b'],
    },
  },
  {
    id: 48,
    name: 'Crédit Agricole Aquitaine',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Aquitaine'],
    },
  },
  {
    id: 51,
    name: 'Crédit Agricole Anjou Maine',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Anjou Maine'],
    },
  },
  {
    id: 141,
    name: 'Crédit Mutuel Maine-Anjou',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditmutuel.png',
    },
    group_name: 'Crédit Mutuel',
    capabilities: ['aggregation', 'account_check'],
    payment_metadata: {
      release_status: 'retired',
      nb_max_transactions: 0,
      max_size_label: 0,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Maine-Anjou'],
    },
  },
  {
    id: 54,
    name: 'Crédit Agricole Centre France',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Centre France'],
    },
  },
  {
    id: 5,
    name: 'SG Particuliers',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/societegenerale.png',
    },
    group_name: 'SG',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['Société Générale'],
      segment: ['b2c'],
    },
  },
  {
    id: 50,
    name: 'Crédit Agricole Alpes Provence',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Alpes Provence'],
    },
  },
  {
    id: 589,
    name: 'Blank',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/blank-20230623140812.png',
    },
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 590,
    name: 'LCL Essentiel Pro',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/lclessentielpro-20230623140953.png',
    },
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 702,
    name: 'Devengo',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/es/devengo.png',
    },
    group_name: 'Devengo',
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 53,
    name: 'Crédit Agricole Centre-Est',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Centre-Est'],
    },
  },
  {
    id: 58,
    name: 'Crédit Agricole Charente Perigord',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Charente Perigord'],
    },
  },
  {
    id: 505,
    name: 'manager.one',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/manager-one.png',
    },
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 575,
    name: 'LCL Espace Pro',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/lcl.png',
    },
    group_name: 'LCL',
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 488,
    name: 'PayPal',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/paypal.png',
    },
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 62,
    name: 'Crédit Agricole Guadeloupe',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Guadeloupe'],
    },
  },
  {
    id: 63,
    name: 'Crédit Agricole Ille-et-Vilaine',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Ille-et-Vilaine'],
    },
  },
  {
    id: 165,
    name: 'Crédit Mutuel du Sud-Ouest Pro',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/credit-mutuel-sud-ouest.png',
    },
    group_name: 'Crédit Mutuel Arkéa',
    capabilities: ['aggregation', 'account_check'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['cmso'],
      segment: ['b2b'],
      region: ['Sud-Ouest'],
    },
  },
  {
    id: 65,
    name: 'Crédit Agricole Loire Haute Loire',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Loire Haute Loire'],
    },
  },
  {
    id: 66,
    name: 'Crédit Agricole Martinique-Guyane',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Martinique-Guyane'],
    },
  },
  {
    id: 652,
    name: "Caisse d'Epargne Entreprises et Professionnels - CENET Loire Drôme Ardèche",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Entreprises et Professionnels - CENET",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Loire Drôme Ardèche'],
    },
  },
  {
    id: 642,
    name: "Caisse d'Epargne Entreprises et Professionnels - CENET Provence Alpes Corse",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Entreprises et Professionnels - CENET",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['reunion', 'martinique', 'guadeloupe', 'guyane'],
      segment: ['b2b'],
      region: ['Provence Alpes Corse'],
    },
  },
  {
    id: 78,
    name: 'Crédit Agricole Sud Rhône Alpes',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Sud Rhône Alpes'],
    },
  },
  {
    id: 116,
    name: 'Crédit Agricole Pyrénées Gascogne',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Pyrénées Gascogne'],
    },
  },
  {
    id: 118,
    name: 'Crédit Agricole Lorraine',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Lorraine'],
    },
  },
  {
    id: 708,
    name: 'Agicap via Swan',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/swan-20240725133157.png',
    },
    group_name: '',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: false,
      provider_environments: ['prod', 'sandbox'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 166,
    name: 'Crédit Mutuel de Bretagne Pro',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/credit-mutuel-bretagne.png',
    },
    group_name: 'Crédit Mutuel Arkéa',
    capabilities: ['aggregation', 'account_check'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['cmb'],
      segment: ['b2b'],
      region: ['Bretagne'],
    },
  },
  {
    id: 59,
    name: 'Crédit Agricole Corse',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Corse'],
    },
  },
  {
    id: 413,
    name: 'N26 (Number 26)',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/n26.png',
    },
    group_name: 'N26',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: false,
      provider_environments: ['prod'],
      execution_status_available: false,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 140,
    name: 'Crédit Mutuel Nord-Europe',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditmutuel.png',
    },
    group_name: 'Crédit Mutuel',
    capabilities: ['aggregation', 'account_check'],
    payment_metadata: {
      release_status: 'retired',
      nb_max_transactions: 0,
      max_size_label: 0,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Nord-Europe'],
    },
  },
  {
    id: 602,
    name: 'Lazard Frères Banque',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/lazard-freres-20231123135900.png',
    },
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 603,
    name: 'Banque des Territoires',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/banque-des-territoires-20231130085158.png',
    },
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 400,
    name: 'Banque Palatine Particuliers',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/palatine.png',
    },
    group_name: 'Banque Palatine',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 50,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c'],
    },
  },
  {
    id: 709,
    name: 'Pennylane via Swan',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/swan-20240725132836.png',
    },
    group_name: '',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: false,
      provider_environments: ['prod', 'sandbox'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 388,
    name: 'Bq. Palatine - Entreprises & Prof. Immobilières',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/palatine.png',
    },
    group_name: 'Banque Palatine',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 50,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 574,
    name: 'Demo bank',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/demo-bank-20250109094909.png',
    },
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment',
      'bulk_payment_scheduled',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 100,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['sandbox'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'degraded',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 622,
    name: "Caisse d'Epargne Pro - Banxo Auvergne et Limousin",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Professionnels - Banxo",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Auvergne et Limousin'],
    },
  },
  {
    id: 712,
    name: 'Lucca via Swan',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/swan-20240725133054.png',
    },
    group_name: '',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: false,
      provider_environments: ['prod', 'sandbox'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 442,
    name: "Caisse d'Epargne Particuliers - Banxo Midi-Pyrénées",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Particuliers - Banxo",
    capabilities: ['aggregation', 'account_check'],
    payment_metadata: {
      release_status: 'retired',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Midi-Pyrénées'],
    },
  },
  {
    id: 600,
    name: 'Crédit Municipal de Lyon',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/ccmdirect-20231103135154.png',
    },
    group_name: 'Crédit Municipal',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod', 'sandbox'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c'],
      region: ['Lyon'],
    },
  },
  {
    id: 444,
    name: "Caisse d'Epargne Particuliers - Banxo Languedoc-Roussillon",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Particuliers - Banxo",
    capabilities: ['aggregation', 'account_check'],
    payment_metadata: {
      release_status: 'retired',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Languedoc-Roussillon'],
    },
  },
  {
    id: 593,
    name: 'HSBCnet',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/hsbc.png',
    },
    group_name: 'HSBC',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: false,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 3415,
    name: 'Stripe FR',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/stripe-20241125115004.png',
    },
    group_name: 'Stripe',
    capabilities: ['aggregation', 'account_check'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 14,
    name: 'CIC',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/cic.png',
    },
    group_name: 'CIC',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'bulk_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 78,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 451,
    name: "Caisse d'Epargne Particuliers - Banxo Hauts de France",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Particuliers - Banxo",
    capabilities: ['aggregation', 'account_check'],
    payment_metadata: {
      release_status: 'retired',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Hauts de France'],
    },
  },
  {
    id: 450,
    name: "Caisse d'Epargne Particuliers - Banxo Grand Est Europe",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Particuliers - Banxo",
    capabilities: ['aggregation', 'account_check'],
    payment_metadata: {
      release_status: 'retired',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Grand Est Europe'],
    },
  },
  {
    id: 447,
    name: "Caisse d'Epargne Particuliers - Banxo Loire-Centre",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Particuliers - Banxo",
    capabilities: ['aggregation', 'account_check'],
    payment_metadata: {
      release_status: 'retired',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Loire-Centre'],
    },
  },
  {
    id: 448,
    name: "Caisse d'Epargne Particuliers - Banxo Côte d'Azur",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Particuliers - Banxo",
    capabilities: ['aggregation', 'account_check'],
    payment_metadata: {
      release_status: 'retired',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['paca'],
      segment: ['b2c', 'b2b'],
      region: ["Côte d'Azur"],
    },
  },
  {
    id: 710,
    name: 'IPaidThat via Swan',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/swan-20240725133104.png',
    },
    group_name: '',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: false,
      provider_environments: ['prod', 'sandbox'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 481,
    name: 'Arkéa Banking Services',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/arkea-banking-services.png',
    },
    group_name: 'Crédit Mutuel Arkéa',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment_scheduled',
      'single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 292,
    name: 'Arkéa Banque Privée',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/arkea-banque-privee.png',
    },
    group_name: 'Crédit Mutuel Arkéa',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 500,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c'],
    },
  },
  {
    id: 482,
    name: 'Arkéa Banque Entreprises et Institutionnels',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/arkea-20230418082431.png',
    },
    group_name: 'Crédit Mutuel Arkéa',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 500,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 3416,
    name: 'BNP Wallis and Futuna',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/bnp.png',
    },
    group_name: 'BNP',
    capabilities: ['aggregation', 'account_check'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Wallis and Futuna'],
    },
  },
  {
    id: 711,
    name: 'Indy via Swan',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/swan-20240725133125.png',
    },
    group_name: '',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: false,
      provider_environments: ['prod', 'sandbox'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 714,
    name: 'Expensya via Swan',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/swan-20240725133138.png',
    },
    group_name: '',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: false,
      provider_environments: ['prod', 'sandbox'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 713,
    name: 'Ageras via Swan',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/swan-20240725133210.png',
    },
    group_name: '',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: false,
      provider_environments: ['prod', 'sandbox'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 6,
    name: 'BNP Paribas Particuliers',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/bnp.png',
    },
    group_name: 'BNP',
    capabilities: [
      'account_check',
      'aggregation',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod', 'sandbox'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c'],
    },
  },
  {
    id: 585,
    name: 'Natixis Wealth Management',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/natixis-wealth-management-20230510070640.png',
    },
    group_name: 'Natixis',
    capabilities: [
      'aggregation',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c'],
    },
  },
  {
    id: 730,
    name: 'Obat via Swan',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/swan-20240821125137.png',
    },
    group_name: '',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: false,
      provider_environments: ['prod', 'sandbox'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 73,
    name: 'Crédit Agricole Normandie',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Normandie'],
    },
  },
  {
    id: 731,
    name: 'LegalPlace via Swan',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/swan-20240821125233.png',
    },
    group_name: '',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: false,
      provider_environments: ['prod', 'sandbox'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 3370,
    name: 'Spiko',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/spiko-20241028141048.png',
    },
    group_name: '',
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 77,
    name: 'Crédit Agricole Sud Méditerranée',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Sud Méditerranée'],
    },
  },
  {
    id: 72,
    name: 'Crédit Agricole Nord Midi-Pyrénées',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Nord Midi-Pyrénées'],
    },
  },
  {
    id: 3417,
    name: 'Banque Wormser Frères',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/wormser-20241127153623.png',
    },
    group_name: '',
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {},
  },
  {
    id: 3371,
    name: 'Monte Paschi Banque',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/monte-paschi-20241024151657.png',
    },
    group_name: '',
    capabilities: ['aggregation', 'account_check'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b', 'b2c'],
    },
  },
  {
    id: 578,
    name: 'BNP Net Entreprises',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/bnp.png',
    },
    group_name: 'BNP',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 607,
    name: 'CCF',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/ccf.png',
    },
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'bulk_payment',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 500,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 3418,
    name: 'BBVA FR',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/es/bbva.png',
    },
    group_name: 'BBVA',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 623,
    name: "Caisse d'Epargne Pro - Banxo Grand Est Europe",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Professionnels - Banxo",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Grand Est Europe'],
    },
  },
  {
    id: 288,
    name: 'Crédit Maritime Atlantique',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/credit-maritime.png',
    },
    group_name: 'Crédit Maritime',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 50,
      max_size_label: 100,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Atlantique'],
    },
  },
  {
    id: 424,
    name: 'Banque Transatlantique',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/banque-transatlantique.png',
    },
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 78,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c'],
    },
  },
  {
    id: 620,
    name: "Caisse d'Epargne Pro - Banxo Ile de France",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Professionnels - Banxo",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Ile De France'],
    },
  },
  {
    id: 612,
    name: "Caisse d'Epargne Pro - Banxo Bourgogne Franche-Comté",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-20240131155355.png',
    },
    group_name: "Caisse d'Epargne Professionnels - Banxo",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Bourgogne Franche-Comté'],
    },
  },
  {
    id: 617,
    name: "Caisse d'Epargne Pro - Banxo Rhône Alpes",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Professionnels - Banxo",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Rhône Alpes'],
    },
  },
  {
    id: 611,
    name: "Caisse d'Epargne Pro - Banxo  Normandie",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Professionnels - Banxo",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Normandie'],
    },
  },
  {
    id: 283,
    name: 'LCL Entreprises',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/lcl.png',
    },
    group_name: 'LCL',
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 425,
    name: 'Floa',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/floa.png',
    },
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c'],
    },
  },
  {
    id: 401,
    name: 'Banque BCP Particuliers',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/banque-bcp.png',
    },
    group_name: 'Banque BCP',
    capabilities: [
      'aggregation',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 25,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c'],
    },
  },
  {
    id: 654,
    name: "Caisse d'Epargne Entreprises et Professionnels - CENET Rhône Alpes",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Entreprises et Professionnels - CENET",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Rhône Alpes'],
    },
  },
  {
    id: 75,
    name: "Crédit Agricole Provence Côte d'Azur",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca', 'paca'],
      segment: ['b2c', 'b2b'],
      region: ["Provence Côte d'Azur"],
    },
  },
  {
    id: 498,
    name: 'Banque BCP Pro',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/banque-bcp.png',
    },
    group_name: 'Banque BCP',
    capabilities: [
      'aggregation',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 25,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 644,
    name: "Caisse d'Epargne Entreprises et Professionnels - CENET Auvergne et Limousin",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Entreprises et Professionnels - CENET",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Auvergne et Limousin'],
    },
  },
  {
    id: 156,
    name: 'Hello Bank FR',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/hello-bank.png',
    },
    group_name: 'Hello Bank',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 3138,
    name: 'Legalstart via Swan',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/swan-20241002115548.png',
    },
    group_name: '',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: false,
      provider_environments: ['prod', 'sandbox'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 651,
    name: "Caisse d'Epargne Entreprises et Professionnels - CENET Languedoc-Roussillon",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Entreprises et Professionnels - CENET",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Languedoc-Roussillon'],
    },
  },
  {
    id: 640,
    name: "Caisse d'Epargne Entreprises et Professionnels - CENET Loire-Centre",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Entreprises et Professionnels - CENET",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Loire-Centre'],
    },
  },
  {
    id: 653,
    name: "Caisse d'Epargne Entreprises et Professionnels - CENET Midi-Pyrénées",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Entreprises et Professionnels - CENET",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Midi-Pyrénées'],
    },
  },
  {
    id: 647,
    name: "Caisse d'Epargne Entreprises et Professionnels - CENET Côte d'Azur",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Entreprises et Professionnels - CENET",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['paca'],
      segment: ['b2b'],
      region: ['Côte d’Azur'],
    },
  },
  {
    id: 621,
    name: "Caisse d'Epargne Pro - Banxo Côte d'Azur",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Professionnels - Banxo",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['paca'],
      segment: ['b2b'],
      region: ["Côte d'Azur"],
    },
  },
  {
    id: 646,
    name: "Caisse d'Epargne Entreprises et Professionnels - CENET Bretagne-Pays de Loire",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Entreprises et Professionnels - CENET",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Bretagne-Pays De Loire'],
    },
  },
  {
    id: 139,
    name: 'Crédit Mutuel Océan',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditmutuel.png',
    },
    group_name: 'Crédit Mutuel',
    capabilities: ['aggregation', 'account_check'],
    payment_metadata: {
      release_status: 'retired',
      nb_max_transactions: 0,
      max_size_label: 0,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Océan'],
    },
  },
  {
    id: 1516,
    name: 'Banque Marze',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/banquepopulaire-dsp2-20240829123932.png',
    },
    group_name: '',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'bulk_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
      'single_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 50,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b', 'b2c'],
    },
  },
  {
    id: 643,
    name: "Caisse d'Epargne Entreprises et Professionnels - CENET Aquitaine Poitou-Charentes",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Entreprises et Professionnels - CENET",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Aquitaine Poitou-Charentes'],
    },
  },
  {
    id: 645,
    name: "Caisse d'Epargne Entreprises et Professionnels - CENET Bourgogne Franche-Comté",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Entreprises et Professionnels - CENET",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Bourgogne Franche-Comté'],
    },
  },
  {
    id: 614,
    name: "Caisse d'Epargne Pro - Banxo Midi-Pyrénées",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Professionnels - Banxo",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Midi-Pyrénées'],
    },
  },
  {
    id: 601,
    name: 'Crédit Municipal de Roubaix',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/ccmdirect-20231109083634.png',
    },
    group_name: 'Crédit Municipal',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod', 'sandbox'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c'],
      region: ['Roubaix'],
    },
  },
  {
    id: 598,
    name: 'Crédit Municipal de Toulon',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/ccmdirect-20231103134509.png',
    },
    group_name: 'Crédit Municipal',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod', 'sandbox'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c'],
      region: ['Toulon'],
    },
  },
  {
    id: 485,
    name: 'Banque Fiducial',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/fiducial.png',
    },
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 167,
    name: 'Crédit Mutuel Massif Central Pro',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditmutuel.png',
    },
    group_name: 'Crédit Mutuel',
    capabilities: ['aggregation', 'account_check'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Massif Central'],
    },
  },
  {
    id: 650,
    name: "Caisse d'Epargne Entreprises et Professionnels - CENET Ile de France",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Entreprises et Professionnels - CENET",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Ile De France'],
    },
  },
  {
    id: 302,
    name: 'Monabanq',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/monabanq.png',
    },
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'bulk_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 78,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 2186,
    name: 'Jump via Swan',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/swan-20240909125217.png',
    },
    group_name: '',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: false,
      provider_environments: ['prod', 'sandbox'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 616,
    name: "Caisse d'Epargne Pro - Banxo Languedoc-Roussillon",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Professionnels - Banxo",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Languedoc-Roussillon'],
    },
  },
  {
    id: 286,
    name: 'Crédit Maritime Littoral du Sud-Ouest',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/credit-maritime.png',
    },
    group_name: 'Crédit Maritime',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 50,
      max_size_label: 100,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Littoral du Sud-Ouest'],
    },
  },
  {
    id: 563,
    name: 'Memo Bank',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/memo-bank.png',
    },
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b', 'b2c'],
    },
  },
  {
    id: 615,
    name: "Caisse d'Epargne Pro - Banxo Aquitaine Poitou-Charentes",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Professionnels - Banxo",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Aquitaine Poitou-Charentes'],
    },
  },
  {
    id: 303,
    name: 'BforBank (Client avant le 18/09/23)',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/bforbank.png',
    },
    capabilities: ['aggregation', 'single_payment', 'single_payment_scheduled'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: false,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 421,
    name: 'Qonto FR',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/qonto.png',
    },
    group_name: 'Qonto',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'bulk_payment',
      'bulk_payment_scheduled',
      'single_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 400,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: false,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 409,
    name: 'Compte Nickel',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/nickel.png',
    },
    capabilities: ['aggregation', 'account_check'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c'],
    },
  },
  {
    id: 618,
    name: "Caisse d'Epargne Pro - Banxo Loire Drôme Ardèche",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Professionnels - Banxo",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Loire Drôme Ardèche'],
    },
  },
  {
    id: 304,
    name: 'Oney - Banque Accord',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/oney.png',
    },
    group_name: 'Oney',
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 3139,
    name: 'Hiway via Swan',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/swan-20241002115643.png',
    },
    group_name: '',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: false,
      provider_environments: ['sandbox', 'prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 414,
    name: 'Carrefour Banque',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/carrefour.png',
    },
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c'],
    },
  },
  {
    id: 415,
    name: 'Oney Banque',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/oney.png',
    },
    group_name: 'Oney',
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 143,
    name: 'Crédit Mutuel Antilles-Guyane',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditmutuel.png',
    },
    group_name: 'Crédit Mutuel',
    capabilities: ['aggregation', 'account_check'],
    payment_metadata: {
      release_status: 'retired',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Antilles-Guyane'],
    },
  },
  {
    id: 613,
    name: "Caisse d'Epargne Pro - Banxo Bretagne-Pays de Loire",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Professionnels - Banxo",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Bretagne-Pays De Loire'],
    },
  },
  {
    id: 476,
    name: 'CIC Banque Privée',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/cic.png',
    },
    group_name: 'CIC',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'bulk_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 78,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 3119,
    name: 'Axonaut via Swan',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/swan-20240924080930.png',
    },
    group_name: '',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: false,
      provider_environments: ['prod', 'sandbox'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 445,
    name: "Caisse d'Epargne Particuliers - Banxo Rhône Alpes",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Particuliers - Banxo",
    capabilities: ['aggregation', 'account_check'],
    payment_metadata: {
      release_status: 'retired',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Rhône Alpes'],
    },
  },
  {
    id: 1515,
    name: 'Banque Dupuy, de Parseval',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/banquepopulaire-dsp2-20240829123425.png',
    },
    group_name: '',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'instant_single_payment',
      'bulk_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 50,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 544,
    name: 'BTP Banque',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/btp.png',
    },
    group_name: 'BTP Banque',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 25,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 487,
    name: 'Anytime FR',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/anytime.png',
    },
    group_name: 'Anytime',
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 279,
    name: 'AXA Banque',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/axa.png',
    },
    capabilities: ['aggregation', 'single_payment', 'instant_single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: false,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c'],
    },
  },
  {
    id: 25,
    name: 'Banque Populaire Occitane',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/banquepopulaire-dsp2.png',
    },
    group_name: 'Banque Populaire',
    capabilities: [
      'account_check',
      'aggregation',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 50,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Occitanie'],
    },
  },
  {
    id: 144,
    name: 'Milleis Banque',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/milleis.png',
    },
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 648,
    name: "Caisse d'Epargne Entreprises et Professionnels - CENET Grand Est Europe",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Entreprises et Professionnels - CENET",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Grand Est Europe'],
    },
  },
  {
    id: 580,
    name: 'Allianz',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/arkea-20230418084124.png',
    },
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 470,
    name: 'Banque Européenne du Crédit Mutuel',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditmutuel.png',
    },
    group_name: 'Crédit Mutuel',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'bulk_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
      'single_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 78,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 428,
    name: 'Shine',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/shine-20240125081436.png',
    },
    capabilities: ['aggregation', 'account_check'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 142,
    name: 'Crédit Mutuel Massif Central',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditmutuel.png',
    },
    group_name: 'Crédit Mutuel',
    capabilities: ['aggregation', 'account_check'],
    payment_metadata: {
      release_status: 'retired',
      nb_max_transactions: 0,
      max_size_label: 0,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Massif Central'],
    },
  },
  {
    id: 297,
    name: 'Banque de Savoie',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/banque-de-savoie.png',
    },
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 50,
      max_size_label: 100,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 655,
    name: 'Banque Delubac & Cie',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/delubac-20240227130131.png',
    },
    group_name: '',
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 289,
    name: 'Crédit Maritime Grand Ouest',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/credit-maritime.png',
    },
    group_name: 'Crédit Maritime',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 50,
      max_size_label: 100,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Grand Ouest'],
    },
  },
  {
    id: 57,
    name: 'Crédit Agricole Charente-Maritime',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Charente-Maritime'],
    },
  },
  {
    id: 61,
    name: 'Crédit Agricole Finistère',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Finistère'],
    },
  },
  {
    id: 117,
    name: 'Crédit Agricole Franche Comté',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Franche Comté'],
    },
  },
  {
    id: 115,
    name: 'Crédit Agricole Brie Picardie',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Brie Picardie'],
    },
  },
  {
    id: 52,
    name: 'Crédit Agricole Atlantique Vendée',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Atlantique Vendée'],
    },
  },
  {
    id: 113,
    name: 'Crédit Agricole Ile de France',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Ile de France'],
    },
  },
  {
    id: 151,
    name: 'La Banque Postale Pro',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/banquepostale.png',
    },
    group_name: 'La Banque Postale',
    capabilities: [
      'aggregation',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['lbp'],
      segment: ['b2b'],
    },
  },
  {
    id: 17,
    name: 'La Banque Postale Particuliers',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/banquepostale.png',
    },
    group_name: 'La Banque Postale',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['lbp'],
      segment: ['b2c'],
    },
  },
  {
    id: 21,
    name: 'Crédit Agricole Savoie',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Savoie'],
    },
  },
  {
    id: 49,
    name: 'Crédit Agricole Centre Loire',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Centre Loire'],
    },
  },
  {
    id: 60,
    name: "Crédit Agricole Côtes d'Armor",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ["Côtes d'Armor"],
    },
  },
  {
    id: 69,
    name: 'Crédit Agricole Deux-Sèvres',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Deux-Sèvres'],
    },
  },
  {
    id: 668,
    name: 'Finom',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/nl/finom.png',
    },
    group_name: 'Finom',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: false,
      provider_environments: ['prod', 'sandbox'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 619,
    name: "Caisse d'Epargne Pro - Banxo  Loire-Centre",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Professionnels - Banxo",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Loire-Centre'],
    },
  },
  {
    id: 418,
    name: 'Natixis Interépargne',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/natixis.png',
    },
    group_name: 'Natixis',
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 446,
    name: "Caisse d'Epargne Particuliers - Banxo Loire Drôme Ardèche",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Particuliers - Banxo",
    capabilities: ['aggregation', 'account_check'],
    payment_metadata: {
      release_status: 'retired',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Loire Drôme Ardèche'],
    },
  },
  {
    id: 23,
    name: 'Bred',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/bred.png',
    },
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'bulk_payment',
      'instant_single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 480,
    name: 'Louvre Banque Privée (ex BPE Banque Privée)',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/arkea-20230414144921.png',
    },
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c'],
    },
  },
  {
    id: 55,
    name: 'Crédit Agricole Centre-Ouest',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Centre-Ouest'],
    },
  },
  {
    id: 56,
    name: 'Crédit Agricole Champagne-Bourgogne',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Champagne-Bourgogne'],
    },
  },
  {
    id: 3452,
    name: 'Caixa Geral de Depositos France',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/pt/sibs-caixa-geral-de-depositos-france.png',
    },
    group_name: 'Caixa Geral de Depositos',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: false,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 2185,
    name: 'Swan',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/swan-20240909125101.png',
    },
    group_name: '',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: false,
      provider_environments: ['prod', 'sandbox'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 649,
    name: "Caisse d'Epargne Entreprises et Professionnels - CENET Hauts de France",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Entreprises et Professionnels - CENET",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Hauts de France'],
    },
  },
  {
    id: 596,
    name: 'Crédit Municipal de Nantes',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/ccmdirect-20231103151540.png',
    },
    group_name: 'Crédit Municipal',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod', 'sandbox'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c'],
      region: ['Nantes'],
    },
  },
  {
    id: 597,
    name: 'Crédit Municipal de Nîmes',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/ccmdirect-20231103151306.png',
    },
    group_name: 'Crédit Municipal',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod', 'sandbox'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c'],
      region: ['Nîmes'],
    },
  },
  {
    id: 419,
    name: 'Yomoni',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/yomoni.png',
    },
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c'],
    },
  },
  {
    id: 138,
    name: 'Crédit Mutuel du Sud-Ouest',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/credit-mutuel-sud-ouest.png',
    },
    group_name: 'Crédit Mutuel Arkéa',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'instant_single_payment',
      'single_payment_scheduled',
      'bulk_payment',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 500,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['cmso'],
      segment: ['b2c', 'b2b'],
      region: ['Sud-Ouest'],
    },
  },
  {
    id: 294,
    name: 'Banque Chalus',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/banque-chalus.png',
    },
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'bulk_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 486,
    name: 'Themis Banque',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/themis.png',
    },
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 586,
    name: 'Rothschild Martin Maurel',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/rothschild-20230525090524.png',
    },
    capabilities: ['aggregation', 'account_check'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c'],
    },
  },
  {
    id: 179,
    name: 'LCL Pro',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/lcl.png',
    },
    group_name: 'LCL',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: false,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['crédit lyonnais'],
      segment: ['b2b'],
    },
  },
  {
    id: 599,
    name: 'Crédit Municipal de Boulogne sur Mer',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/ccmdirect-20231103152027.png',
    },
    group_name: 'Crédit Municipal',
    capabilities: ['aggregation', 'single_payment'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod', 'sandbox'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c'],
      region: ['Boulogne sur Mer'],
    },
  },
  {
    id: 641,
    name: "Caisse d'Epargne Entreprises et Professionnels - CENET Normandie",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Entreprises et Professionnels - CENET",
    capabilities: ['aggregation'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
      region: ['Normandie'],
    },
  },
  {
    id: 436,
    name: 'Sumeria (ex Lydia comptes)',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/sumeria.png',
    },
    capabilities: ['aggregation', 'account_check'],
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c'],
    },
  },
  {
    id: 609,
    name: 'Bforbank (Client depuis le 18/09/23)',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/bforbank-beta.png',
    },
    group_name: '',
    capabilities: ['aggregation', 'single_payment', 'single_payment_scheduled'],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: false,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
    },
  },
  {
    id: 36,
    name: 'Banque Populaire Alsace Lorraine Champagne',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/banquepopulaire-dsp2.png',
    },
    group_name: 'Banque Populaire',
    capabilities: [
      'account_check',
      'aggregation',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 50,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Alsace Lorraine Champagne'],
    },
  },
  {
    id: 30,
    name: 'Banque Populaire Aquitaine Centre Atlantique',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/banquepopulaire-dsp2.png',
    },
    group_name: 'Banque Populaire',
    capabilities: [
      'account_check',
      'aggregation',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 50,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Aquitaine Centre Atlantique'],
    },
  },
  {
    id: 440,
    name: "Caisse d'Epargne Particuliers - Banxo Bourgogne Franche-Comté",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Particuliers - Banxo",
    capabilities: ['aggregation', 'account_check'],
    payment_metadata: {
      release_status: 'retired',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Bourgogne Franche-Comté'],
    },
  },
  {
    id: 28,
    name: 'Banque Populaire Auvergne Rhône Alpes',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/banquepopulaire-dsp2.png',
    },
    group_name: 'Banque Populaire',
    capabilities: [
      'account_check',
      'aggregation',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 50,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Auvergne Rhône Alpes'],
    },
  },
  {
    id: 32,
    name: 'Banque Populaire Bourgogne Franche-Comté',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/banquepopulaire-dsp2.png',
    },
    group_name: 'Banque Populaire',
    capabilities: [
      'account_check',
      'aggregation',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 50,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Bourgogne Franche-Comté'],
    },
  },
  {
    id: 37,
    name: 'Banque Populaire du Nord',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/banquepopulaire-dsp2.png',
    },
    group_name: 'Banque Populaire',
    capabilities: [
      'account_check',
      'aggregation',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 50,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Nord'],
    },
  },
  {
    id: 40,
    name: 'Banque Populaire du Sud',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/banquepopulaire-dsp2.png',
    },
    group_name: 'Banque Populaire',
    capabilities: [
      'account_check',
      'aggregation',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 50,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Sud'],
    },
  },
  {
    id: 38,
    name: 'Banque Populaire Grand Ouest',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/banquepopulaire-dsp2.png',
    },
    group_name: 'Banque Populaire',
    capabilities: [
      'account_check',
      'aggregation',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 50,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod', 'sandbox'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Grand Ouest'],
    },
  },
  {
    id: 18,
    name: 'Banque Populaire Rives de Paris',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/banquepopulaire-dsp2.png',
    },
    group_name: 'Banque Populaire',
    capabilities: [
      'account_check',
      'aggregation',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 50,
      max_size_label: 100,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Rives de Paris'],
    },
  },
  {
    id: 39,
    name: 'Banque Populaire Méditerranée',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/banquepopulaire-dsp2.png',
    },
    group_name: 'Banque Populaire',
    capabilities: [
      'account_check',
      'aggregation',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 50,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Méditerranée'],
    },
  },
  {
    id: 15,
    name: 'Banque Populaire Val de France',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/banquepopulaire-dsp2.png',
    },
    group_name: 'Banque Populaire',
    capabilities: [
      'account_check',
      'aggregation',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 50,
      max_size_label: 100,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Val de France'],
    },
  },
  {
    id: 449,
    name: "Caisse d'Epargne Particuliers - Banxo Auvergne et Limousin",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Particuliers - Banxo",
    capabilities: ['aggregation', 'account_check'],
    payment_metadata: {
      release_status: 'retired',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Auvergne et Limousin'],
    },
  },
  {
    id: 441,
    name: "Caisse d'Epargne Particuliers - Banxo Bretagne-Pays de Loire",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Particuliers - Banxo",
    capabilities: ['aggregation', 'account_check'],
    payment_metadata: {
      release_status: 'retired',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Bretagne-Pays De Loire'],
    },
  },
  {
    id: 437,
    name: "Caisse d'Epargne Particuliers - Banxo Ile de France",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Particuliers - Banxo",
    capabilities: ['aggregation', 'account_check'],
    payment_metadata: {
      release_status: 'retired',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod', 'sandbox'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Ile De France'],
    },
  },
  {
    id: 499,
    name: 'Crédit Coopératif Entreprises',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/credit-cooperatif-particuliers.png',
    },
    group_name: 'Crédit Coopératif',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
      'bulk_payment',
      'bulk_payment_scheduled',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 25,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2b'],
    },
  },
  {
    id: 284,
    name: 'Crédit Coopératif Particuliers',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/credit-cooperatif-particuliers.png',
    },
    group_name: 'Crédit Coopératif',
    capabilities: [
      'aggregation',
      'single_payment',
      'single_payment_scheduled',
      'instant_single_payment',
      'bulk_payment_scheduled',
      'bulk_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 25,
      max_size_label: 100,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c'],
    },
  },
  {
    id: 443,
    name: "Caisse d'Epargne Particuliers - Banxo Aquitaine Poitou-Charentes",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Particuliers - Banxo",
    capabilities: ['aggregation', 'account_check'],
    payment_metadata: {
      release_status: 'retired',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'degraded',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Aquitaine Poitou-Charentes'],
    },
  },
  {
    id: 119,
    name: 'Crédit Agricole Nord Est',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Nord Est'],
    },
  },
  {
    id: 71,
    name: 'Crédit Agricole Nord de France',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Nord De France'],
    },
  },
  {
    id: 64,
    name: 'Crédit Agricole Languedoc',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Languedoc'],
    },
  },
  {
    id: 439,
    name: "Caisse d'Epargne Particuliers - Banxo Normandie",
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/caisseepargne-dsp2.png',
    },
    group_name: "Caisse d'Epargne Particuliers - Banxo",
    capabilities: ['aggregation', 'account_check'],
    payment_metadata: {
      release_status: 'retired',
      nb_max_transactions: 1,
      max_size_label: 140,
      multiple_dates_payments: false,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      segment: ['b2c', 'b2b'],
      region: ['Normandie'],
    },
  },
  {
    id: 76,
    name: 'Crédit Agricole Réunion',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Réunion'],
    },
  },
  {
    id: 80,
    name: 'Crédit Agricole Touraine Poitou',
    country_code: 'FR',
    images: {
      logo: 'https://web.bridgeapi.io/img/banks-logo/fr/creditagricole-dsp2.png',
    },
    group_name: 'Crédit Agricole',
    capabilities: [
      'aggregation',
      'account_check',
      'single_payment',
      'single_payment_scheduled',
      'bulk_payment_scheduled',
      'bulk_payment',
      'instant_single_payment',
    ],
    payment_metadata: {
      release_status: 'active',
      nb_max_transactions: 80,
      max_size_label: 140,
      multiple_dates_payments: true,
      sender_iban_available: true,
      provider_environments: ['prod'],
      execution_status_available: true,
    },
    aggregation_metadata: {
      release_status: 'active',
    },
    health_status: {
      single_payment: {
        status: 'healthy',
      },
      aggregation: {
        status: 'healthy',
      },
    },
    tags: {
      keywords: ['ca'],
      segment: ['b2c', 'b2b'],
      region: ['Touraine Poitou'],
    },
  },
];
