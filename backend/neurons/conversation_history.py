# conversation_history.py
import uuid
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer


temp_conversation_id= str(uuid.uuid4())
class ConversationHistory:
    def __init__(self):
        self.history = {}

    def get_history(self, conversation_id):
        # Retrieve or initialize conversation history for the given conversation_id
        return self.history.setdefault(conversation_id, [])

    def get_history_within_limit(self, conversation_id, max_tokens, use_summaries=True, max_messages=None):
        # Retrieve or initialize conversation history for the given conversation_id
        history = self.history.setdefault(conversation_id, [])

        if use_summaries:
            # Calculate the total tokens in the conversation history
            total_tokens = sum(len(message["content"].split()) for message in history)

            # If it exceeds the token limit, calculate the number of messages needed
            if total_tokens > max_tokens:
                num_messages = 0
                current_tokens = 0
                for message in history:
                    current_tokens += len(message["content"].split())
                    num_messages += 1
                    if current_tokens > max_tokens:
                        break
            else:
                num_messages = len(history)

            # Return the history within the calculated number of messages
            return history[-num_messages:]
        elif max_messages is not None:
            # Get the last 'max_messages' messages from the history
            return history[-max_messages:]
        else:
            # Return the entire history
            return history
    
    def get_summarized_history(self, conversation_id, max_tokens):
        # Retrieve or initialize conversation history for the given conversation_id
        history = self.history.setdefault(conversation_id, [])

        # Combine all messages into a single document
        document = " ".join(message["content"] for message in history)

        # Summarize the document
        summarizer = LsaSummarizer()
        parser = PlaintextParser.from_string(document, Tokenizer("english"))
        summary = summarizer(parser.document, 1)  # Get a single sentence summary

        # Return the summarized history
        return [{"role": "summarized", "content": str(sentence)} for sentence in summary]
    
    def add_user_message(self, conversation_id, prompt):
        # Add user prompt to the conversation history
        history = self.get_history(conversation_id)
        history.append({"role": "user", "content": prompt})

    def add_ai_message(self, conversation_id, response):
        # Add AI response to the conversation history
        history = self.get_history(conversation_id)
        history.append({"role": "assistant", "content": response})

    def clear_history(self, conversation_id):
        # Clear conversation history for the given conversation_id
        if conversation_id in self.history:
            del self.history[conversation_id]

    def generate_conversation_id(self):
        # Function to generate a unique conversation_id for each request
        return temp_conversation_id
