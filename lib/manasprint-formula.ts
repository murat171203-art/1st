/**
 * ManasPrint Формуласы - Документти автоматтык түрдө форматтоо логикасы
 * Бул файл Lovable (же башка AI/Backend) үчүн документти кантип 
 * бөлүү жана номерлөө керектигин түшүндүргөн негизги эрежелерди (Formula) камтыйт.
 */

export const MANASPRINT_FORMULA = {
  version: "1.0",
  description: "КТМУ (Манас университети) стандартындагы дипломдук/курстук иштерди номерлөө эрежеси",
  rules: [
    {
      section: "Титулдук барак (Титульный лист)",
      pageIndex: 1,
      numbering: {
        isVisible: false,
        format: "none",
        countsAs: 1,
        description: "Номер такыр көрүнбөйт (бирок 1-барак деп эсептелет)."
      }
    },
    {
      section: "Аннотация / Мазмуну (Abstract / TOC)",
      startIndex: 2,
      numbering: {
        isVisible: true,
        format: "lowerRoman", // i, ii, iii...
        startValue: "ii", 
        description: "Бул жерде номерлөө ii (же i) башталып, түз рим цифралары менен кетет."
      }
    },
    {
      section: "Киришүү (Введение / Introduction) жана Негизги бөлүк",
      triggerKeywords: ["Киришүү", "Введение", "Introduction"],
      action: "Insert Section Break (Next Page) / Несквозная секирик",
      numbering: {
        isVisible: true,
        format: "decimal", // 1, 2, 3...
        startValue: 1,
        restarts: true,
        description: "Мына ушул жерден 'Несквозная' секирик жасалат. Барактын номери кайрадан 1 (араб цифрасы) болуп өзгөрөт."
      }
    }
  ],
  formatting: {
    margins: { left: 3.5, right: 2.5, top: 3.0, bottom: 2.5, unit: "cm" },
    font: { family: "Times New Roman", size: 12 },
    spacing: { line: 1.5, alignment: "justify" }
  }
};
