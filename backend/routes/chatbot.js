const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Hugging Face API configuration
const HF_API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2';

// System prompt for KodBank chatbot
const SYSTEM_PROMPT = `You are KodBank AI Assistant, a friendly and helpful banking chatbot for KodBank. 

YOUR PERSONALITY:
- Warm, friendly, and professional
- Respond naturally to greetings and casual conversation
- Be conversational and human-like
- Show empathy and understanding

IMPORTANT RULES:
1. You CAN respond to greetings (hello, hi, good morning, how are you, etc.)
2. You CAN engage in brief polite conversation
3. You CAN answer questions about banking, finance, and KodBank services
4. You CANNOT help with code generation, programming, or technical development
5. You CANNOT generate images or create visual content
6. For non-banking topics, politely redirect to banking services

KodBank Services:
- Savings Account: High-interest savings with flexible withdrawals
- Credit Cards: Premium cards with cashback and rewards
- Home Loans: Competitive rates up to ₹1 Crore
- Mobile Banking: 24/7 account access
- Secure Transactions: Bank-grade encryption
- Business Banking: Solutions for SMEs
- Customer Support: 24/7 phone (1800-123-4567), email (support@kodbank.com), and live chat
- Welcome Bonus: ₹1,00,000 on account opening

CONVERSATION GUIDELINES:
- Greet users warmly when they say hello
- Respond naturally to "how are you", "thank you", "goodbye"
- Be helpful and guide users to banking services
- Keep responses concise but friendly
- Always offer to help with banking needs

Answer questions professionally and helpfully. Be conversational and natural.`;

// Fallback responses for common banking questions
function getFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();

  // Services question
  if (lowerMessage.includes('service') || lowerMessage.includes('offer')) {
    return "KodBank offers a comprehensive range of banking services:\n\n" +
           "💰 Savings Account - High-interest savings with flexible withdrawals\n" +
           "💳 Credit Cards - Premium cards with cashback and reward points\n" +
           "🏠 Home Loans - Competitive interest rates up to ₹1 Crore\n" +
           "📱 Mobile Banking - 24/7 access to your account from anywhere\n" +
           "🔒 Secure Transactions - Bank-grade security with end-to-end encryption\n" +
           "💼 Business Banking - Tailored solutions for small and medium businesses\n\n" +
           "Plus, get ₹1,00,000 welcome bonus on account opening! How can I help you with any of these services?";
  }

  // Balance question
  if (lowerMessage.includes('balance') || lowerMessage.includes('check balance')) {
    return "To check your account balance:\n\n" +
           "1. Click on the 'Check Balance' button on your dashboard\n" +
           "2. Your current balance will be displayed instantly\n" +
           "3. You can also use our mobile banking app for 24/7 access\n\n" +
           "Your account comes with a welcome bonus of ₹1,00,000! Would you like to know more about managing your account?";
  }

  // Interest rates
  if (lowerMessage.includes('interest') || lowerMessage.includes('rate')) {
    return "KodBank offers competitive interest rates:\n\n" +
           "💰 Savings Account: Up to 6.5% per annum\n" +
           "🏠 Home Loans: Starting from 8.5% per annum\n" +
           "💳 Credit Cards: 0% interest on purchases for 45 days\n" +
           "💼 Business Loans: Customized rates based on your business needs\n\n" +
           "Interest rates are subject to change. Would you like more details about any specific product?";
  }

  // Support/Contact
  if (lowerMessage.includes('support') || lowerMessage.includes('contact') || lowerMessage.includes('help')) {
    return "You can reach KodBank customer support 24/7:\n\n" +
           "📞 Phone: 1800-123-4567 (Toll-free)\n" +
           "✉️ Email: support@kodbank.com\n" +
           "💬 Live Chat: Available on our website and mobile app\n" +
           "🏢 Branch: Visit your nearest KodBank branch\n\n" +
           "Our support team is always ready to assist you. What can I help you with today?";
  }

  // Credit cards
  if (lowerMessage.includes('credit card') || lowerMessage.includes('card')) {
    return "KodBank offers premium credit cards with amazing benefits:\n\n" +
           "✨ Cashback up to 5% on all purchases\n" +
           "🎁 Reward points on every transaction\n" +
           "✈️ Travel benefits and lounge access\n" +
           "🛡️ Zero liability on fraudulent transactions\n" +
           "💳 45 days interest-free credit period\n\n" +
           "Apply now and get instant approval! Would you like to know more about our card options?";
  }

  // Loans
  if (lowerMessage.includes('loan') || lowerMessage.includes('borrow')) {
    return "KodBank provides various loan options:\n\n" +
           "🏠 Home Loans: Up to ₹1 Crore at competitive rates\n" +
           "🚗 Auto Loans: Quick approval with flexible EMI options\n" +
           "👤 Personal Loans: Instant approval up to ₹10 Lakhs\n" +
           "💼 Business Loans: Customized solutions for your business\n\n" +
           "All loans come with flexible repayment options. Which loan are you interested in?";
  }

  // Account opening
  if (lowerMessage.includes('open account') || lowerMessage.includes('new account') || lowerMessage.includes('register')) {
    return "Opening a KodBank account is easy!\n\n" +
           "✅ Register on our website or mobile app\n" +
           "✅ Provide basic details (name, email, phone, ID proof)\n" +
           "✅ Complete KYC verification\n" +
           "✅ Get instant ₹1,00,000 welcome bonus!\n\n" +
           "Your account will be activated immediately. Ready to get started?";
  }

  // Mobile banking
  if (lowerMessage.includes('mobile') || lowerMessage.includes('app')) {
    return "KodBank Mobile Banking offers:\n\n" +
           "📱 24/7 account access from anywhere\n" +
           "💸 Instant money transfers\n" +
           "📊 Real-time balance and transaction history\n" +
           "🔔 Transaction alerts and notifications\n" +
           "🔒 Secure biometric login\n" +
           "💳 Card management and controls\n\n" +
           "Download our app from Play Store or App Store today!";
  }

  // Transaction
  if (lowerMessage.includes('transfer') || lowerMessage.includes('transaction') || lowerMessage.includes('send money')) {
    return "KodBank makes transactions easy and secure:\n\n" +
           "⚡ Instant transfers to any bank account\n" +
           "🔒 Bank-grade encryption for all transactions\n" +
           "💰 No charges on internal transfers\n" +
           "📱 Transfer via mobile app, website, or branch\n" +
           "🔔 Instant SMS and email confirmations\n\n" +
           "You can transfer money 24/7. Need help with a specific transaction?";
  }

  // Default response for other banking questions
  return "Thank you for your question about KodBank! I'm here to help you with:\n\n" +
         "• Account services and balance inquiries\n" +
         "• Credit cards and loans\n" +
         "• Interest rates and fees\n" +
         "• Mobile banking and transactions\n" +
         "• Customer support and branch locations\n\n" +
         "Could you please provide more details about what you'd like to know? Or you can contact our 24/7 support at 1800-123-4567 for immediate assistance.";
}

// Chat endpoint
router.post('/chat', authMiddleware, async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const lowerMessage = message.toLowerCase().trim();

    // Handle greetings and common phrases naturally
    const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'];
    const thankYou = ['thank you', 'thanks', 'appreciate it', 'thank u', 'thx'];
    const goodbye = ['bye', 'goodbye', 'see you', 'take care', 'have a nice day'];
    const howAreYou = ['how are you', 'how r u', 'how are u', 'how do you do', 'whats up', "what's up"];

    // Check for greetings
    if (greetings.some(greeting => lowerMessage.includes(greeting) && lowerMessage.length < 30)) {
      return res.json({
        response: "Hello! 👋 I'm KodBank AI Assistant. I'm here to help you with all your banking needs. How can I assist you today? Feel free to ask about our services, accounts, loans, or any banking questions you have!"
      });
    }

    // Check for "how are you"
    if (howAreYou.some(phrase => lowerMessage.includes(phrase))) {
      return res.json({
        response: "I'm doing great, thank you for asking! 😊 I'm here and ready to help you with your banking needs. How can I assist you today? Would you like to know about our services, check your account, or have any questions about KodBank?"
      });
    }

    // Check for thank you
    if (thankYou.some(phrase => lowerMessage.includes(phrase))) {
      return res.json({
        response: "You're very welcome! 😊 I'm always happy to help. If you have any more questions about KodBank services or need assistance with anything else, feel free to ask. Have a great day!"
      });
    }

    // Check for goodbye
    if (goodbye.some(phrase => lowerMessage.includes(phrase))) {
      return res.json({
        response: "Goodbye! 👋 Thank you for chatting with KodBank AI Assistant. If you need any help in the future, I'm always here. Have a wonderful day! 🌟"
      });
    }

    // Check if question is about code/programming/image generation
    const restrictedKeywords = [
      'write code', 'generate code', 'create code', 'python code', 'javascript code',
      'html code', 'css code', 'programming', 'function code', 'script',
      'generate image', 'create image', 'draw image', 'make picture', 'design image'
    ];

    const isRestricted = restrictedKeywords.some(keyword => lowerMessage.includes(keyword));

    if (isRestricted) {
      return res.json({
        response: "I appreciate your question, but I'm specifically designed to help with banking and financial services at KodBank. I can't assist with code generation, programming, or image creation. However, I'd be happy to help you with:\n\n• Account information\n• Banking services\n• Loans and credit cards\n• Transactions\n• Customer support\n\nWhat banking service can I help you with today? 😊"
      });
    }

    // Build conversation context
    let conversationContext = SYSTEM_PROMPT + '\n\n';
    
    // Add recent conversation history (last 5 messages)
    const recentHistory = conversationHistory.slice(-5);
    recentHistory.forEach(msg => {
      conversationContext += `User: ${msg.user}\nAssistant: ${msg.assistant}\n\n`;
    });
    
    conversationContext += `User: ${message}\nAssistant:`;

    // Call Hugging Face API
    const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
    
    if (!HF_API_KEY || HF_API_KEY === 'your-huggingface-api-key-here') {
      // Fallback response when API key is not configured
      return res.json({
        response: getFallbackResponse(message)
      });
    }

    try {
      const apiResponse = await fetch(HF_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: conversationContext,
          parameters: {
            max_new_tokens: 250,
            temperature: 0.7,
            top_p: 0.95,
            return_full_text: false
          }
        })
      });

      if (!apiResponse.ok) {
        console.error('Hugging Face API error:', apiResponse.status);
        // Use fallback on API error
        return res.json({
          response: getFallbackResponse(message)
        });
      }

      const data = await apiResponse.json();
      
      // Check if response has error
      if (data.error) {
        console.error('Hugging Face API error:', data.error);
        return res.json({
          response: getFallbackResponse(message)
        });
      }

      let botResponse = data[0]?.generated_text || getFallbackResponse(message);

      // Clean up response
      botResponse = botResponse.trim();
      
      // Remove any continuation of user prompt
      if (botResponse.includes('User:')) {
        botResponse = botResponse.split('User:')[0].trim();
      }

      res.json({ response: botResponse });

    } catch (apiError) {
      console.error('Hugging Face API call failed:', apiError.message);
      // Use fallback on API failure
      return res.json({
        response: getFallbackResponse(message)
      });
    }

  } catch (error) {
    console.error('Chatbot error:', error);
    res.json({ 
      response: getFallbackResponse(req.body.message || '')
    });
  }
});

module.exports = router;
