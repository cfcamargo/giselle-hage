import type { Credential, FaqItem, ContentPost, ProcessStep, Treatment } from '~/types/landing'

const treatments: readonly Treatment[] = [
  {
    slug: 'botox',
    eyebrow: 'Toxina botulínica',
    title: 'Botox',
    summary: 'Uma avaliação cuidadosa orienta o uso da toxina botulínica para suavizar marcas de expressão e preservar a naturalidade dos seus traços.',
    image: '/new-botox.webp',
    alt: 'Mulher com expressão serena durante um cuidado facial individualizado.'
  },
  {
    slug: 'preenchimento',
    eyebrow: 'Equilíbrio facial',
    title: 'Preenchimento',
    summary: 'O preenchimento facial é planejado de forma individual para valorizar contornos, proporções e volumes com segurança e respeito à sua anatomia.',
    image: '/new-preenchimento.jpeg',
    alt: 'Aplicação clínica próxima à região dos olhos e da face durante atendimento profissional.'
  },
  {
    slug: 'peeling',
    eyebrow: 'Qualidade da pele',
    title: 'Peeling',
    summary: 'O peeling é indicado após avaliação clínica para apoiar a renovação da pele e cuidar de textura, luminosidade e manchas conforme cada necessidade.',
    image: '/new-peeling.png',
    alt: 'Rosto feminino em luz suave para representar o cuidado com a qualidade da pele.'
  }
]

const credentials: readonly Credential[] = [
  { label: 'Formação', value: 'Cirurgiã-dentista desde 2009' },
  { label: 'Registro profissional', value: 'CRO-MS 4589' },
  { label: 'Atendimento', value: 'Atendimento individualizado' }
]

const processSteps: readonly ProcessStep[] = [
  {
    title: 'Avaliação',
    description: 'Escuta cuidadosa, exame clínico e alinhamento de expectativas antes de qualquer decisão.'
  },
  {
    title: 'Plano individual',
    description: 'Definição dos procedimentos indicados, prioridades e cronograma para o seu caso.'
  },
  {
    title: 'Procedimento',
    description: 'Execução com técnica precisa, sempre com foco em preservar a naturalidade dos traços.'
  },
  {
    title: 'Acompanhamento',
    description: 'Retornos para ajustar, cuidar e preservar o resultado ao longo do tempo.'
  }
]

const content: readonly ContentPost[] = [
  {
    title: 'Botox tem contraindicação?',
    teaser: 'Entenda em que situações a toxina botulínica não é indicada e por que a avaliação clínica vem antes de qualquer procedimento.'
  },
  {
    title: 'Como prolongar o preenchimento labial',
    teaser: 'Cuidados simples no dia a dia que ajudam a manter o resultado do preenchimento por mais tempo.'
  },
  {
    title: 'O que perguntar antes de agendar uma avaliação',
    teaser: 'Perguntas que valem a pena levar para a primeira consulta, para decidir com mais segurança.'
  }
]

const faqs: readonly FaqItem[] = [
  {
    question: 'Como saber qual tratamento é indicado para mim?',
    answer: 'A indicação é definida em avaliação individual, considerando suas queixas, anatomia, histórico e objetivos.'
  },
  {
    question: 'O resultado fica natural?',
    answer: 'O planejamento busca respeitar seus traços e alinhar expectativas de forma clara antes de qualquer procedimento.'
  },
  {
    question: 'Botox e preenchimento são a mesma coisa?',
    answer: 'Não. Cada procedimento tem indicações diferentes e pode ser recomendado de acordo com a avaliação clínica.'
  },
  {
    question: 'Como funciona o agendamento?',
    answer: 'Envie uma mensagem pelo WhatsApp para solicitar sua avaliação e receber as orientações de atendimento.'
  }
]

export const landingContent = {
  brand: {
    name: 'Dra. Giselle Hage',
    logo: '/Logo.svg'
  },
  contact: {
    whatsapp: {
      phone: '5567981269482',
      message: 'Olá, Dra. Giselle! Conheci seu site e gostaria de agendar uma avaliação para entender qual tratamento é mais indicado para mim.'
    },
    instagramUrl: 'https://www.instagram.com/dra.gisellehage/'
  },
  hero: {
    eyebrow: 'Harmonização orofacial em Ponta Porã',
    headline: 'Harmonização Orofacial em Ponta Porã',
    supporting: 'Precisão, naturalidade e cuidado individual para valorizar seus traços.',
    image: '/hero-new.png'
  },
  credentials,
  treatments,
  philosophy: 'Prevenção, gerenciamento do envelhecimento e respeito aos traços naturais em cada plano de cuidado.',
  process: processSteps,
  content,
  results: [
    { image: '/results/bigode.jpg', category: 'preenchimento', alt: 'Montagem lado a lado de duas fotografias da região da boca, com o texto incorporado “Bigode Chinês e canto da boca” e a marca GH.' },
    { image: '/results/botox1.jpg', category: 'botox', alt: 'Montagem lado a lado de duas fotografias da testa, com o texto incorporado “Toxina Botulínica” e a marca GH.' },
    { image: '/results/botox2.jpg', category: 'botox', alt: 'Montagem lado a lado de duas fotografias da região dos olhos e sobrancelhas, com o texto incorporado “Toxina Botulínica” e a marca GH.' },
    { image: '/results/botox3.jpg', category: 'botox', alt: 'Montagem lado a lado de duas fotografias da testa e sobrancelhas, com o texto incorporado “Toxina Botulínica” e a marca GH.' },
    { image: '/results/labial1.jpg', category: 'preenchimento', alt: 'Montagem lado a lado de duas fotografias de perfil dos lábios e do queixo, com o texto incorporado “Preenchimento Labial e Mento” e a marca GH.' },
    { image: '/results/labial2.jpg', category: 'preenchimento', alt: 'Montagem lado a lado de duas fotografias em ângulo dos lábios, com o texto incorporado “Preenchimento Labial e Mento” e a marca GH.' },
    { image: '/results/labial3.jpg', category: 'preenchimento', alt: 'Montagem lado a lado de duas fotografias frontais dos lábios, com o texto incorporado “Preenchimento Labial e Mento” e a marca GH.' }
  ],
  profile: {
    image: '/giselle-sobre.jpg',
    alt: 'Retrato profissional da cirurgiã-dentista Dra. Giselle Hage em ambiente clínico.',
    biography: 'Antes de trabalhar com estética facial, construí minha formação a partir do conhecimento profundo da face.',
    registration: 'CRO-MS 4589',
    evaluation: 'Cada plano de cuidado é definido após uma avaliação individual, considerando anatomia, histórico e expectativas.',
    foundations: [
      {
        title: 'Cirurgia e Traumatologia Bucomaxilofacial',
        description: 'Compreensão detalhada da anatomia, das estruturas ósseas e dos tecidos que compõem o rosto, com formação voltada ao planejamento e à segurança.'
      },
      {
        title: 'Harmonização Orofacial',
        description: 'Um olhar para proporções, equilíbrio, envelhecimento e estética, sempre considerando a individualidade de cada paciente.'
      }
    ],
    transition: 'Essas duas áreas se complementam na minha prática.',
    statement: [
      'Conhecer a estrutura é essencial para saber como intervir.',
      'Compreender a individualidade é essencial para saber quando intervir.'
    ],
    closing: 'Por isso, meu trabalho em Harmonização Orofacial começa muito antes do procedimento: começa na avaliação, no planejamento e na indicação consciente. Porque acredito que a estética mais bonita é aquela que respeita a identidade de quem a carrega.'
  },
  faqs,
  location: {
    address: 'R. Tiradentes, 481 - Centro, Ponta Porã - MS, 79904-620',
    postalAddress: {
      streetAddress: 'R. Tiradentes, 481 - Centro',
      addressLocality: 'Ponta Porã',
      addressRegion: 'MS',
      postalCode: '79904-620',
      addressCountry: 'BR'
    },
    city: 'Ponta Porã - MS',
    regionalReach: 'Atendimento em Ponta Porã e cidades vizinhas, na região da fronteira entre Brasil e Paraguai, próxima a Pedro Juan Caballero.',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14740.600180165486!2d-55.7266496!3d-22.5360514!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94626fcb4c139687%3A0x6e402d3ecf6437f7!2sDra.%20Giselle%20Hage%20-%20Harmoniza%C3%A7%C3%A3o%20Facial%20em%20Ponta%20Por%C3%A3%20MS!5e0!3m2!1spt-BR!2sbr!4v1695854782910!5m2!1spt-BR!2sbr'
  }
} as const
