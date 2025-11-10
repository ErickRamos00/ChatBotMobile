export const containsOffensiveLanguage = (text: string): boolean => {
  const offensiveWords = [
    'porra', 'caralho', 'merda', 'puta', 'vadia', 'viado', 'bicha', 'foda-se', 'cuzão',
    'buceta', 'pau no cu', 'filho da puta', 'arrombado', 'escroto', 'imbecil', 'idiota',
    'retardado', 'babaca', 'otário', 'palhaço', 'lixo humano',
    'preto noia', 'macaco', 'judeu safado', 'nazista', 'terrorista',
    'viadinho', 'sapatão', 'traveco', 'baitola', 'cu'
  ];

  const offensiveRegex = new RegExp(
    offensiveWords.map(word => word.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')).join('|'),
    'i'
  );

  return offensiveRegex.test(text);
};
