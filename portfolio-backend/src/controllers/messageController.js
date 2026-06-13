import Message from '../models/Message.js'
import { sendTelegramMessage } from '../utils/telegram.js'

export const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    })

    const telegramText = `
📩 <b>New Portfolio Message</b>

<b>Name:</b> ${name}
<b>Email:</b> ${email}
<b>Subject:</b> ${subject}

<b>Message:</b>
${message}
`

    await sendTelegramMessage(telegramText)

    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message' })
  }
}

export const getMessages = async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 })
  res.json(messages)
}

export const deleteMessage = async (req, res) => {
  await Message.findByIdAndDelete(req.params.id)
  res.json({ success: true })
}