export const WHATSAPP_NUMBER = '351935197656' // atualizado com o número fornecido (351 + número local)

export const WHATSAPP_MSG = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    text ?? 'Olá! Gostaria de saber mais sobre o Oxygen Gym.'
  )}`

export const INSTAGRAM_URL = 'https://www.instagram.com/oxygengymfitness/' // atualizado
export const FACEBOOK_URL = 'https://www.facebook.com/oxygen.gym.fitness'   // atualizar
export const PHONE = '+351 935 197 656'                         // atualizado para corresponder ao WhatsApp
export const EMAIL = 'geral@oxygengym.pt'                       // atualizar
export const ADDRESS = 'Rua Exemplo, 123, 2500-000 Caldas da Rainha' // atualizar
export const MAPS_URL = 'https://maps.google.com/?q=Oxygen+Gym+Caldas+da+Rainha' // atualizar
