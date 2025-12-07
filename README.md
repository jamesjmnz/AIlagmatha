# AI Lagmatha - Scam Detection System

An intelligent scam detection system that analyzes messages in English and Tagalog to identify potential scams using machine learning, rule-based analysis, and RAG (Retrieval Augmented Generation).

## Features

- 🤖 **Multi-language Support**: Detects scams in both English and Tagalog
- 🧠 **ML-Powered Classification**: Uses transformer models for accurate scam detection
- 🔍 **Rule-Based Analysis**: Pattern matching for common scam indicators
- 🔗 **URL Checking**: Analyzes suspicious URLs in messages
- 📚 **RAG Integration**: Retrieves similar scam patterns from knowledge base
- 💡 **AI-Generated Insights**: Provides explanations and follow-up questions
- 🌐 **RESTful API**: FastAPI backend with comprehensive endpoints
- ⚛️ **Modern Frontend**: Next.js with TypeScript and Tailwind CSS

## Project Structure

```
ailagmatha/
├── backend/
│   ├── app/
│   │   ├── agents/          # LangGraph agent workflow
│   │   ├── analysis/        # Rule-based and URL checking
│   │   ├── api/             # FastAPI routes
│   │   ├── models/          # ML models (English & Tagalog classifiers)
│   │   ├── rag/             # RAG components (retrieval, generation)
│   │   ├── schema/          # Pydantic models
│   │   └── utils/           # Language routing utilities
│   ├── data/
│   │   └── rag_docs/        # Knowledge base documents
│   └── .env                 # Environment variables
└── frontend/                # Next.js application
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
  "question_insights": ["Question 1", "Question 2", "Question 3"]
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
6. **Insights Node**: Creates follow-up questions for educational purposes

### Risk Score Calculation

```
risk_score = (scam_prob × 0.7) + (rule_score × 0.2) + (url_bonus × 0.1)
```

Where:
- `scam_prob`: ML model confidence (0-1)
- `rule_score`: Pattern match score (0-0.3)
- `url_bonus`: 0.2 if suspicious URLs detected

## Models Used

- **English Classifier**: `cybersectony/phishing-email-detection-distilbert_v2.1`
- **Tagalog Classifier**: `jcblaise/roberta-tagalog-base`

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

- `next`: React framework
- `react`: UI library
- `typescript`: Type safety
- `tailwindcss`: Styling

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

## License

[Add your license here]

## Contributing

[Add contribution guidelines here]

## Authors

[Add author information here]
