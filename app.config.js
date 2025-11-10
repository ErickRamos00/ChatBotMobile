export default {
  expo: {
    name: "best-virtual-expo",
    // ... outras configurações existentes ...
    extra: {
      GROQ_API_KEY: process.env.GROQ_API_KEY
    }
  }
};