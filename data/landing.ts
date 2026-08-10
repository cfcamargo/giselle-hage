import type { Credential, FaqItem, Treatment } from '~/types/landing'

const treatments: readonly Treatment[] = [
  {
    slug: 'botox',
    eyebrow: 'Toxina botulínica',
    title: 'Botox',
    summary: 'Uma avaliação cuidadosa orienta o uso da toxina botulínica para suavizar marcas de expressão e preservar a naturalidade dos seus traços.',
    image: '/botox-bg.png',
    alt: 'Mulher com expressão serena durante um cuidado facial individualizado.'
  },
  {
    slug: 'preenchimento',
    eyebrow: 'Equilíbrio facial',
    title: 'Preenchimento',
    summary: 'O preenchimento facial é planejado de forma individual para valorizar contornos, proporções e volumes com segurança e respeito à sua anatomia.',
    image: '/preenchimento.png',
    alt: 'Aplicação clínica próxima à região dos olhos e da face durante atendimento profissional.'
  },
  {
    slug: 'peeling',
    eyebrow: 'Qualidade da pele',
    title: 'Peeling',
    summary: 'O peeling é indicado após avaliação clínica para apoiar a renovação da pele e cuidar de textura, luminosidade e manchas conforme cada necessidade.',
    image: '/peeling-bg.png',
    alt: 'Rosto feminino em luz suave para representar o cuidado com a qualidade da pele.'
  }
]

const credentials: readonly Credential[] = [
  { label: 'Formação', value: 'Cirurgiã-dentista desde 2009' },
  { label: 'Registro profissional', value: 'CRO-MS 4589' },
  { label: 'Atendimento', value: 'Atendimento individualizado' }
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
    image: '/hero-bg.jpg'
  },
  credentials,
  treatments,
  philosophy: 'Prevenção, gerenciamento do envelhecimento e respeito aos traços naturais em cada plano de cuidado.',
  results: [
    { image: '/services/bigode.jpg', category: 'preenchimento', alt: 'Montagem lado a lado de duas fotografias da região da boca, com o texto incorporado “Bigode Chinês e canto da boca” e a marca GH.' },
    { image: '/services/botox1.jpg', category: 'botox', alt: 'Montagem lado a lado de duas fotografias da testa, com o texto incorporado “Toxina Botulínica” e a marca GH.' },
    { image: '/services/botox2.jpg', category: 'botox', alt: 'Montagem lado a lado de duas fotografias da região dos olhos e sobrancelhas, com o texto incorporado “Toxina Botulínica” e a marca GH.' },
    { image: '/services/botox3.jpg', category: 'botox', alt: 'Montagem lado a lado de duas fotografias da testa e sobrancelhas, com o texto incorporado “Toxina Botulínica” e a marca GH.' },
    { image: '/services/labial1.jpg', category: 'preenchimento', alt: 'Montagem lado a lado de duas fotografias de perfil dos lábios e do queixo, com o texto incorporado “Preenchimento Labial e Mento” e a marca GH.' },
    { image: '/services/labial2.jpg', category: 'preenchimento', alt: 'Montagem lado a lado de duas fotografias em ângulo dos lábios, com o texto incorporado “Preenchimento Labial e Mento” e a marca GH.' },
    { image: '/services/labial3.jpg', category: 'preenchimento', alt: 'Montagem lado a lado de duas fotografias frontais dos lábios, com o texto incorporado “Preenchimento Labial e Mento” e a marca GH.' }
  ],
  profile: {
    image: '/about.jpg',
    alt: 'Retrato profissional da cirurgiã-dentista Dra. Giselle Hage em ambiente clínico.',
    biography: 'Cirurgiã-dentista formada pela UNIDERP em 2009, com atuação em harmonização orofacial e atenção individualizada.',
    registration: 'CRO-MS 4589',
    evaluation: 'Cada plano de cuidado é definido após uma avaliação individual, considerando anatomia, histórico e expectativas.'
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
