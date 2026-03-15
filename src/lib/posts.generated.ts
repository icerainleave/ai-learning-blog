// Generated file, do not edit.
export const posts = [
  {
    "slug": "ai-went-off-track",
    "title": "我昨天把 AI 用跑偏了：方向聊明白了，进度却没往前走",
    "date": "2026-03-14",
    "excerpt": "我把 Codex 跑通了，也花 30–60 分钟把副业方向聊清楚了。但我 80% 的精力都消耗在“聊散 + 纠正 AI 回复 + 写规则更新协作方式”上，最后产出几乎全是规则，主线目标反而被挤掉。",
    "tags": [
      "AI",
      "Codex",
      "复盘",
      "效率",
      "沟通"
    ],
    "cover": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    "content": "# 我昨天把 AI 用跑偏了：方向聊明白了，进度却没往前走\n\n我昨天（2026-03-14）做了件看起来很“努力”、但结果很尴尬的事：我把 AI 的协作规则越调越顺，主线事情反而没推进多少。\n\n这篇不是讲模型，也不是工具测评。我只想把这个坑写清楚：为什么会跑偏，以及我后来是怎么处理的。\n\n## 我做了什么\n\n我把 Codex 跑通了，改回官方账号正常用。\n\n我也花了大约 30–60 分钟跟 AI 聊副业，方向基本确定：AI 工具学习 + Citywalk，小红书图文为主。\n\n然后我开始搭“小红书机制”的目录框架——也就是后面内容要怎么放、怎么迭代、怎么复盘。\n\n问题出在这里：框架还没搭完，我已经把大量时间花在别的地方了。\n\n## 我是怎么跑偏的\n\n现在回头看，问题不是“我让 AI 写了太多”，而是我把大量来回花在了**纠正它怎么回我**上。\n\n我当时在做两件事：一边聊副业（话题很容易越聊越散），一边搭小红书目录框架（想把后续输出都装进去）。\n\n然后节奏就变成了这样：\n\n- AI 回得不太对，我会停下来纠正它。\n- 纠正着纠正着，我就顺手把“哪里不对”写成规则，让它触发自进化。\n- 规则一多，对话确实更顺了，但原本要推进的那件事被不断打断，最后就没推进多少。\n\n结果就是：时间和注意力都被“纠错 + 写规则 + 再纠错”吃掉了，事情反而没往前走。\n\n## 为什么这事很容易让人上头\n\n写规则这件事很容易让人上头，因为它会给你一种“我在把事情变得更可控”的感觉。\n\n但它有一个副作用：只要你不设边界，它就会无限吸走注意力——尤其当你本来聊的就是“副业/方向/机制”这种没有标准答案的话题。\n\n最后你会得到一个很顺的协作系统，然后发现今天该做的那件事还在原地。\n\n## 我后来是怎么处理的\n\n我不打算停掉自进化。现实是：在沟通过程里，我就是需要 AI 不停更新规则，不然它很难越来越贴合我。\n\n问题不在“更不更新”，而在“更新的时候把主线弄丢了”。\n\n所以我真正做的改动只有一条：**自进化可以发生，但自进化结束后，必须自动回到原话题，按新规则继续聊下去。**\n\n我和 AI 约定的具体做法是：\n\n### 1）进入自进化前，先锁定主线\n\nAI 在开始写规则前，要用一句话把当下主线问题钉住（避免“写着写着就忘了刚才在聊什么”）。\n\n### 2）自进化结束后，必须续上主线\n\nAI 在规则更新后要明确告诉我“规则已更新”，然后用“回到主线：……”把原问题接回去继续推进，不需要我再提醒“回到正题”。\n\n这条看起来很小，但它决定了对话会不会从“越聊越偏”变成“越聊越贴合还不掉主线”。\n\n对我来说，最直观的变化是：规则更新完，话题不会断在半路，我不用再手动把讨论拖回正题。\n\n## 给自己留一句话\n\nAI 可以慢慢变好，但目标不能一直等。\n"
  },
  {
    "slug": "transformer-basics",
    "title": "Transformer 架构入门指南",
    "date": "2026-03-14",
    "excerpt": "深入理解 Transformer 的核心工作机制",
    "tags": [
      "AI",
      "Transformer",
      "深度学习"
    ],
    "cover": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    "content": "# Transformer 架构入门指南\n\n## 前言\n\nTransformer 架构是当前 AI 领域最重要的突破之一，它完全改变了我们处理序列数据的方式。\n\n## 核心组件\n\n### 1. 注意力机制\n\n注意力机制是 Transformer 的核心组件。让我用一个简单的图示来说明：\n\n![注意力机制示意图](https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800)\n\n### 2. 多头注意力\n\n多头注意力允许模型同时关注不同位置的不同表示子空间：\n\n```python\nclass MultiHeadAttention(nn.Module):\n    def __init__(self, d_model, num_heads):\n        super().__init__()\n        self.num_heads = num_heads\n        self.d_model = d_model\n        assert d_model % num_heads == 0\n\n        self.d_k = d_model // num_heads\n        self.W_q = nn.Linear(d_model, d_model)\n        self.W_k = nn.Linear(d_model, d_model)\n        self.W_v = nn.Linear(d_model, d_model)\n        self.W_o = nn.Linear(d_model, d_model)\n```\n\n## 总结\n\nTransformer 的优势：\n- 并行计算效率高\n- 长距离依赖建模能力强\n- 通用性强，可应用于多种任务\n\n> \"注意力机制就是让模型学会'关注'什么\"\n"
  },
  {
    "slug": "llm-fine-tuning",
    "title": "LLM 微调实践：LoRA 完全指南",
    "date": "2026-03-10",
    "excerpt": "手把手教你使用 LoRA 进行大语言模型微调",
    "tags": [
      "LLM",
      "LoRA",
      "微调"
    ],
    "cover": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
    "content": "# LLM 微调实践：LoRA 完全指南\n\n## 为什么选择 LoRA？\n\n传统的全参数微调需要大量的 GPU 显存，而 LoRA（Low-Rank Adaptation）通过冻结预训练模型权重，只训练少量参数，大大降低了计算成本。\n\n![LoRA 原理图](https://images.unsplash.com/photo-1676299081847-824916de030a?w=800)\n\n## 环境配置\n\n```bash\npip install transformers peft datasets accelerate\n```\n\n## 代码实现\n\n```python\nfrom transformers import AutoModelForCausalLM, AutoTokenizer\nfrom peft import LoraConfig, get_peft_model, TaskType\n\n# 1. 加载基础模型\nmodel = AutoModelForCausalLM.from_pretrained(\"facebook/opt-350m\")\ntokenizer = AutoTokenizer.from_pretrained(\"facebook/opt-350m\")\n\n# 2. 配置 LoRA\nlora_config = LoraConfig(\n    r=16,\n    lora_alpha=32,\n    target_modules=[\"q_proj\", \"v_proj\"],\n    lora_dropout=0.05,\n    bias=\"none\",\n    task_type=TaskType.CAUSAL_LM\n)\n\n# 3. 获取 LoRA 模型\nlora_model = get_peft_model(model, lora_config)\nlora_model.print_trainable_parameters()\n# 输出: trainable params: 4,194,304 || all params: 346,375,168 || trainable%: 1.21\n```\n\n## 实验结果\n\n| 方法 | 显存需求 | 训练时间 | 效果 |\n|------|---------|---------|------|\n| 全参数微调 | 80GB+ | 24h | 100% |\n| LoRA | 24GB | 4h | 98% |\n\n## 结论\n\nLoRA 是一种高效的模型微调方法，特别适合个人开发者和小型团队使用。\n"
  }
];
