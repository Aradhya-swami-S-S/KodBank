# KodBank AI Chatbot Setup Guide

## Overview
The KodBank AI Chatbot is powered by Hugging Face's Mistral-7B-Instruct model and provides banking-specific assistance to users.

## Features

### 🤖 AI Assistant Capabilities
- Answers banking and finance questions
- Provides information about KodBank services
- Helps with account inquiries
- Offers support guidance
- **Restricted**: Cannot help with code generation, image generation, or non-banking topics

### 🎨 User Interface
1. **Floating Chat Button** (Bottom Right Corner)
   - Always visible on dashboard
   - Pulsing animation to attract attention
   - Click to open chatbot

2. **Sidebar Button** (AI Assistant)
   - Accessible from sidebar navigation
   - Opens chatbot window

3. **Chatbot Window**
   - **Minimized Mode**: Small window (380x550px) in bottom right
   - **Expanded Mode**: Full-page view
   - Toggle between modes with expand/minimize button

### 💬 Chat Features
- Real-time conversation
- Message history
- Typing indicators
- Quick question buttons
- Timestamps on messages
- Smooth animations

## Setup Instructions

### 1. Get Hugging Face API Key

1. Go to [Hugging Face](https://huggingface.co/)
2. Create an account or login
3. Go to Settings → Access Tokens
4. Create a new token with "Read" permissions
5. Copy the token

### 2. Configure Environment Variable

Add your Hugging Face API key to `.env`:

```env
HUGGINGFACE_API_KEY=hf_your_actual_api_key_here
```

### 3. Restart Backend Server

```bash
# Stop the current backend process
# Then restart:
npm run dev
```

## API Endpoint

### POST `/api/chatbot/chat`

**Request:**
```json
{
  "message": "What services does KodBank offer?",
  "conversationHistory": [
    {
      "user": "previous question",
      "assistant": "previous response"
    }
  ]
}
```

**Response:**
```json
{
  "response": "KodBank offers various services including..."
}
```

**Authentication:** Requires JWT token (user must be logged in)

## Chatbot Behavior

### ✅ Will Answer Questions About:
- Banking services (savings, loans, cards)
- Account management
- Transaction inquiries
- Interest rates
- Customer support
- KodBank features
- Financial advice (general)

### ❌ Will NOT Answer Questions About:
- Code generation or programming
- Image generation or creation
- Non-banking topics (weather, recipes, etc.)
- Personal advice unrelated to banking
- Technical implementation details

### Example Interactions

**Good Questions:**
- "What services does KodBank offer?"
- "How do I check my account balance?"
- "What are the interest rates for savings accounts?"
- "How can I contact customer support?"
- "Tell me about home loans"

**Restricted Questions:**
- "Write Python code for me" → Redirected to banking topics
- "Generate an image" → Redirected to banking topics
- "What's the weather?" → Redirected to banking topics

## Component Structure

### Backend
```
backend/
├── routes/
│   └── chatbot.js          # Chatbot API endpoint
└── server.js               # Added chatbot route
```

### Frontend
```
frontend/
├── src/
│   ├── components/
│   │   ├── Chatbot.js      # Main chatbot component
│   │   └── Chatbot.css     # Chatbot styles
│   └── pages/
│       └── Dashboard.js    # Integrated chatbot
```

## Customization

### Modify System Prompt
Edit `backend/routes/chatbot.js`:

```javascript
const SYSTEM_PROMPT = `You are KodBank AI Assistant...`;
```

### Change Quick Questions
Edit `frontend/src/components/Chatbot.js`:

```javascript
const quickQuestions = [
  "Your custom question 1",
  "Your custom question 2",
  // ...
];
```

### Adjust AI Parameters
In `backend/routes/chatbot.js`:

```javascript
parameters: {
  max_new_tokens: 250,    // Response length
  temperature: 0.7,       // Creativity (0-1)
  top_p: 0.95            // Diversity
}
```

## Styling

### Theme Support
The chatbot automatically adapts to light/dark theme:

**Light Theme:**
- Yellow/amber colors
- Brown text
- White background

**Dark Theme:**
- Dark blue background
- Light text
- Yellow accents

### Responsive Design
- Desktop: Full-featured window
- Mobile: Adapts to screen size
- Touch-friendly buttons

## Troubleshooting

### Chatbot Not Responding
1. Check Hugging Face API key in `.env`
2. Verify backend server is running
3. Check browser console for errors
4. Ensure user is logged in

### API Rate Limits
- Hugging Face free tier has rate limits
- Consider upgrading for production use
- Implement caching if needed

### Model Loading Time
- First request may take 10-20 seconds (model loading)
- Subsequent requests are faster
- Show loading indicator to users

## Security

### Authentication
- All chatbot requests require JWT authentication
- Users must be logged in to use chatbot

### Content Filtering
- System prompt restricts non-banking topics
- Backend validates message content
- Prevents misuse of AI capabilities

## Performance

### Optimization Tips
1. Keep conversation history limited (last 5 messages)
2. Use appropriate token limits
3. Implement request debouncing
4. Cache common responses (optional)

## Future Enhancements

### Potential Features
- [ ] Voice input/output
- [ ] Multi-language support
- [ ] Sentiment analysis
- [ ] Transaction assistance
- [ ] Personalized recommendations
- [ ] Chat history persistence
- [ ] Export chat transcripts

## Support

For issues or questions:
- Check console logs
- Verify API key configuration
- Review Hugging Face API status
- Contact development team

## Credits

- **AI Model**: Mistral-7B-Instruct-v0.2 by Mistral AI
- **API Provider**: Hugging Face
- **Integration**: KodBank Development Team

---

**Note**: Remember to keep your Hugging Face API key secure and never commit it to version control!
