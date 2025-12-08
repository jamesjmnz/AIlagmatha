# AIlagmatha - ScamShield AI

An intelligent scam detection system that analyzes messages in English, Tagalog, and Taglish to identify potential scams using machine learning, rule-based analysis, and RAG (Retrieval Augmented Generation). Features a modern, user-friendly web interface built with Next.js.

## Features

- 🤖 **Multi-language Support**: Detects scams in English, Filipino, and Taglish
- 🧠 **ML-Powered Classification**: Uses transformer models for accurate scam detection
- 🔍 **Rule-Based Analysis**: Pattern matching for common scam indicators
- 🔗 **URL Checking**: Analyzes suspicious URLs in messages
- 📚 **RAG Integration**: Retrieves similar scam patterns from knowledge base
- 💡 **AI-Generated Insights**: Provides explanations and interactive Q&A with answers
- 🌐 **RESTful API**: FastAPI backend with CORS support
- ⚛️ **Modern Frontend**: Next.js 16 with TypeScript, Tailwind CSS, and Radix UI components
- 🎨 **Beautiful UI**: Clean, modern design with interactive components
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Project Structure

```
ailagmatha/
├── backend/
│   ├── app/
│   │   ├── agents/          # LangGraph agent workflow
│   │   ├── analysis/        # Rule-based and URL checking
│   │   ├── api/             # FastAPI routes
│   │   │   └── v1/
│   │   │       └── scam.py  # Scam detection endpoints
│   │   ├── models/          # ML models (English & Tagalog classifiers)
│   │   ├── rag/             # RAG components (retrieval, generation)
│   │   ├── schema/          # Pydantic models
│   │   └── utils/           # Language routing utilities
│   ├── data/
│   │   └── rag_docs/        # Knowledge base documents
│   ├── main.py              # FastAPI application entry point
│   └── .env                 # Environment variables
└── frontend/                # Next.js application
    ├── app/
    │   ├── app/             # Scam detector tool page
    │   ├── components/      # Reusable UI components
    │   ├── Hero.tsx         # Landing page hero section
    │   ├── Features.tsx     # Features section
    │   ├── Works.tsx        # How it works section
    │   ├── Helps.tsx        # Use cases section
    │   └── Faq.tsx          # FAQ section
    ├── components/
    │   ├── Navbar.tsx       # Navigation bar
    │   └── ui/              # Radix UI components
    └── lib/
        └── api/             # API client functions
```

## Prerequisites

- Python 3.13+
- Node.js 18+
- OpenAI API key (for RAG and explanations)
- Virtual environment (recommended)

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install transformers torch fastapi uvicorn python-dotenv langgraph openai
```

4. Create a `.env` file in the `backend/` directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

5. Run the backend server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://127.0.0.1:8000`

**Note**: CORS is configured to allow requests from `http://localhost:3000` and `http://127.0.0.1:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### POST `/api/v1/analyze`

Analyzes a message for scam detection.

**Request:**
```json
{
  "message": "Your message to analyze"
}
```

**Response:**
```json
{
  "final_label": "scam" | "legit",
  "risk_score": 0.75,
  "severity": "high" | "medium" | "low",
  "model_result": {
    "label": "scam",
    "scam_prob": 0.85,
    "lang_used": "en"
  },
  "rules_result": {
    "matches": ["otp", "click"],
    "rule_score": 0.3
  },
  "urls_result": [...],
  "rag_evidence": [...],
  "explanation": "Explanation text",
  "question_insights": [
    {
      "question": "Why do scammers ask for OTP codes?",
      "answer": "Detailed answer explaining OTP scams..."
    },
    {
      "question": "How do urgent messages trick people?",
      "answer": "Detailed answer about urgency tactics..."
    },
    {
      "question": "Is it safe to click links from unknown senders?",
      "answer": "Detailed answer about link safety..."
    }
  ]
}
```

### POST `/api/v1/insight-answer`

Generates an answer to a follow-up question about a scam message.

**Request:**
```json
{
  "message": "Original scam message",
  "question": "User's question"
}
```

**Response:**
```json
{
  "answer": "Generated answer text"
}
```

## How It Works

The system uses a LangGraph-based agent workflow:

1. **Classification Node**: Detects language (English/Tagalog) and runs appropriate ML model
2. **Rules Node**: Applies pattern matching for common scam indicators
3. **RAG Node**: Retrieves similar scam patterns from knowledge base
4. **Decision Node**: Combines all signals to calculate final risk score
5. **Explanation Node**: Generates AI explanation of the verdict
6. **Insights Node**: Creates follow-up questions with detailed answers for educational purposes

### Risk Score Calculation

```
risk_score = (scam_prob × 0.7) + (rule_score × 0.2) + (url_bonus × 0.1)
```

Where:
- `scam_prob`: ML model confidence (0-1)
- `rule_score`: Pattern match score (0-0.3)
- `url_bonus`: 0.2 if suspicious URLs detected

### Frontend Features

- **Landing Page**: Modern hero section with feature highlights
- **Scam Detector Tool** (`/app`): 
  - File upload with drag & drop support
  - Text input with character counter
  - Real-time analysis with loading states
  - Interactive results display with:
    - Visual risk indicators (badges, progress bars)
    - Language detection
    - AI-generated explanations
    - Clickable questions that reveal detailed answers in "AI Insight" section
- **Responsive Design**: Works on all screen sizes

## Models Used

- **English Classifier**: `cybersectony/phishing-email-detection-distilbert_v2.1`
- **Tagalog Classifier**: `jcblaise/roberta-tagalog-base`
- **LLM**: OpenAI GPT-4o-mini (for explanations and insights)

## Development

### Backend Dependencies

- `fastapi`: Web framework
- `uvicorn`: ASGI server
- `transformers`: Hugging Face transformers for ML models
- `torch`: PyTorch for model inference
- `langgraph`: Agent workflow orchestration
- `openai`: OpenAI API client for RAG
- `python-dotenv`: Environment variable management

### Frontend Dependencies

- `next`: React framework (v16.0.7)
- `react`: UI library (v19.2.0)
- `typescript`: Type safety
- `tailwindcss`: Styling (v4)
- `lucide-react`: Icon library
- `@radix-ui/react-*`: Accessible UI components
- `class-variance-authority`: Component variants
- `tailwind-merge`: Utility for merging Tailwind classes

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

## Usage

1. Start the backend server (see Backend Setup)
2. Start the frontend server (see Frontend Setup)
3. Navigate to `http://localhost:3000` in your browser
4. Use the landing page to learn about the platform
5. Click "Launch Scam Detector" or navigate to `/app` to analyze messages
6. Paste or upload a suspicious message
7. Click "Analyze Message" to get results
8. Click on any question to see detailed AI-generated answers

## License

[Add your license here]

## Contributing

[Add contribution guidelines here]

## Authors

[Add author information here]
