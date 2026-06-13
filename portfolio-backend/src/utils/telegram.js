import axios from 'axios'

export const sendTelegramMessage = async (text) => {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    const url = `https://api.telegram.org/bot${token}/sendMessage`

    await axios.post(url, {
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    })
  } catch (error) {
    console.error('Telegram error:', error.message)
  }
}