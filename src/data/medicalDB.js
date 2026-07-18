// Medical knowledge base: lab test reference ranges, plain-language explanations,
// and general lifestyle/dietary recommendations. Values are adult reference ranges
// drawn from common clinical lab references. This is for EDUCATIONAL purposes only.

export const MEDICAL_DB = {
  haemoglobin: {
    aliases: ["haemoglobin", "hemoglobin", "hb", "hgb"],
    unit: "g/dL",
    range: { low: 13.0, high: 17.0 },
    category: "Hematology",
    explanation: {
      low: "Haemoglobin is low, meaning your blood carries less oxygen than ideal. This can cause tiredness, weakness, or pale skin (a common sign of anaemia).",
      high: "Haemoglobin is high, which can make the blood thicker. This may be linked to dehydration, smoking, or, less often, a bone marrow condition.",
    },
    recommendations: {
      low: "Eat iron-rich foods such as lean red meat, spinach, lentils, and fortified cereals. Pair them with vitamin C (citrus, peppers) to boost absorption. See a doctor if fatigue or pallor persists.",
      high: "Stay well hydrated, avoid smoking, and discuss the result with a clinician, especially if you have headaches or a flushed complexion.",
    },
  },
  rbc: {
    aliases: ["rbc", "red blood cell", "red blood cells", "red cell count", "erythrocyte count"],
    unit: "million/µL",
    range: { low: 4.2, high: 5.9 },
    category: "Hematology",
    explanation: {
      low: "Red blood cell count is below the typical range, which can reduce oxygen delivery to tissues and contribute to fatigue.",
      high: "Red blood cell count is elevated, which may thicken the blood and is sometimes linked to dehydration or low oxygen levels.",
    },
    recommendations: {
      low: "Include iron, vitamin B12, and folate in your diet (leafy greens, eggs, fish, legumes). Follow up with a healthcare provider if symptoms continue.",
      high: "Drink plenty of water and avoid smoking. Consult a clinician to rule out underlying causes.",
    },
  },
  wbc: {
    aliases: ["wbc", "white blood cell", "white blood cells", "leucocyte count", "leukocyte count", "tlc", "total leucocyte count"],
    unit: "cells/µL",
    range: { low: 4000, high: 11000 },
    category: "Hematology",
    explanation: {
      low: "White blood cell count is low, which can weaken the immune system and make infections harder to fight off.",
      high: "White blood cell count is high, often a sign that the body is fighting an infection, inflammation, or stress.",
    },
    recommendations: {
      low: "Prioritise hygiene, avoid crowded places when unwell, and eat a balanced diet. Seek medical advice if you develop fevers or frequent infections.",
      high: "Rest and hydrate. If accompanied by fever, pain, or persistent symptoms, consult a doctor to identify the source of inflammation or infection.",
    },
  },
  platelets: {
    aliases: ["platelets", "platelet count", "plt"],
    unit: "cells/µL",
    range: { low: 150000, high: 450000 },
    category: "Hematology",
    explanation: {
      low: "Platelet count is low, which can make bruising or bleeding more likely and slower to stop.",
      high: "Platelet count is high, which can increase clotting risk in some cases.",
    },
    recommendations: {
      low: "Avoid contact sports and NSAIDs (e.g. aspirin/ibuprofen) unless cleared by a doctor. Report unusual bruising or bleeding promptly.",
      high: "Stay hydrated and discuss with a clinician, especially if you have a history of clotting or inflammation.",
    },
  },
  glucose: {
    aliases: ["glucose", "fasting glucose", "fasting blood sugar", "fbs", "blood sugar", "fbg"],
    unit: "mg/dL",
    range: { low: 70, high: 100 },
    category: "Metabolic",
    explanation: {
      low: "Blood glucose is below the normal fasting range, which can cause shakiness, dizziness, or confusion (low blood sugar).",
      high: "Blood glucose is above the normal fasting range, which may indicate impaired sugar handling or diabetes.",
    },
    recommendations: {
      low: "Eat regular balanced meals with complex carbohydrates. If you feel faint, a quick sugar source (fruit, juice) can help — seek care if episodes recur.",
      high: "Limit refined sugars and refined carbs, prioritise fibre and whole grains, exercise regularly, and maintain a healthy weight. Follow up with a clinician for confirmation (e.g. HbA1c).",
    },
  },
  hba1c: {
    aliases: ["hba1c", "glycated haemoglobin", "glycated hemoglobin", "a1c"],
    unit: "%",
    range: { low: 4.0, high: 5.6 },
    category: "Metabolic",
    explanation: {
      low: "HbA1c is below the typical range, which in non-diabetics is rarely concerning but can reflect low average blood sugar.",
      high: "HbA1c is elevated, indicating higher average blood sugar over the past 2-3 months. Values of 5.7-6.4% suggest pre-diabetes; 6.5%+ may indicate diabetes.",
    },
    recommendations: {
      low: "Maintain regular meals and monitor for symptoms of low blood sugar.",
      high: "Reduce sugary foods and drinks, increase fibre intake, exercise most days, and consult a clinician for a formal assessment and management plan.",
    },
  },
  cholesterol_total: {
    aliases: ["total cholesterol", "cholesterol", "cholesterol total", "tc"],
    unit: "mg/dL",
    range: { low: 0, high: 200 },
    category: "Lipids",
    explanation: {
      low: "Total cholesterol is below the typical range, which is generally not a concern for most adults.",
      high: "Total cholesterol is above the recommended range, increasing the risk of heart disease over time.",
    },
    recommendations: {
      low: "No specific action usually required.",
      high: "Adopt a low-saturated-fat diet (less fried food and red meat), eat more soluble fibre (oats, beans), exercise regularly, and discuss with a doctor whether further lipid testing is needed.",
    },
  },
  ldl: {
    aliases: ["ldl", "ldl cholesterol", "low-density lipoprotein"],
    unit: "mg/dL",
    range: { low: 0, high: 100 },
    category: "Lipids",
    explanation: {
      low: "LDL ('bad') cholesterol is low, which is generally favourable for heart health.",
      high: "LDL ('bad') cholesterol is high, contributing to plaque build-up in arteries and raising cardiovascular risk.",
    },
    recommendations: {
      low: "Maintain your current healthy habits.",
      high: "Reduce saturated and trans fats, increase fibre and omega-3s (fish, nuts), exercise regularly, and consult a clinician about whether medication is appropriate.",
    },
  },
  hdl: {
    aliases: ["hdl", "hdl cholesterol", "high-density lipoprotein"],
    unit: "mg/dL",
    range: { low: 40, high: 60 },
    category: "Lipids",
    explanation: {
      low: "HDL ('good') cholesterol is low, meaning less protective clearance of cholesterol from the bloodstream.",
      high: "HDL ('good') cholesterol is high, which is generally protective for heart health.",
    },
    recommendations: {
      low: "Increase aerobic exercise, include healthy fats (olive oil, avocado, nuts), avoid trans fats, and stop smoking if applicable.",
      high: "Maintain your current lifestyle.",
    },
  },
  triglycerides: {
    aliases: ["triglycerides", "tg", "triglyceride"],
    unit: "mg/dL",
    range: { low: 0, high: 150 },
    category: "Lipids",
    explanation: {
      low: "Triglycerides are below the typical range, which is generally not a concern.",
      high: "Triglycerides are elevated, often linked to excess calories, sugar, alcohol, or uncontrolled diabetes, and can raise heart risk.",
    },
    recommendations: {
      low: "No specific action usually required.",
      high: "Cut added sugars and refined carbs, limit alcohol, exercise regularly, and lose weight if needed. Discuss with a clinician if persistently high.",
    },
  },
  creatinine: {
    aliases: ["creatinine", "serum creatinine"],
    unit: "mg/dL",
    range: { low: 0.6, high: 1.3 },
    category: "Renal",
    explanation: {
      low: "Creatinine is below the typical range, which is usually not clinically significant and may reflect low muscle mass.",
      high: "Creatinine is elevated, which can indicate reduced kidney function or dehydration.",
    },
    recommendations: {
      low: "No specific action usually required.",
      high: "Stay well hydrated, avoid excessive NSAID use, and consult a doctor for kidney function assessment (eGFR) if persistent.",
    },
  },
  urea: {
    aliases: ["urea", "blood urea", "bun", "blood urea nitrogen"],
    unit: "mg/dL",
    range: { low: 7, high: 20 },
    category: "Renal",
    explanation: {
      low: "Urea is below the typical range, often due to low protein intake or high hydration, and is usually not concerning.",
      high: "Urea is elevated, which can reflect dehydration, high protein intake, or reduced kidney function.",
    },
    recommendations: {
      low: "No specific action usually required.",
      high: "Drink adequate water, balance protein intake, and follow up with a clinician if it remains high.",
    },
  },
  sodium: {
    aliases: ["sodium", "na", "na+"],
    unit: "mmol/L",
    range: { low: 135, high: 145 },
    category: "Electrolytes",
    explanation: {
      low: "Sodium is below the normal range (hyponatraemia), which can cause fatigue, headache, or confusion.",
      high: "Sodium is above the normal range (hypernatraemia), often due to dehydration, causing thirst or confusion.",
    },
    recommendations: {
      low: "Avoid excessive water intake and consult a doctor, especially if symptoms appear.",
      high: "Increase fluid intake and seek medical advice if symptoms persist.",
    },
  },
  potassium: {
    aliases: ["potassium", "k", "k+"],
    unit: "mmol/L",
    range: { low: 3.5, high: 5.0 },
    category: "Electrolytes",
    explanation: {
      low: "Potassium is below the normal range (hypokalaemia), which can cause muscle weakness or cramps.",
      high: "Potassium is above the normal range (hyperkalaemia), which can affect heart rhythm and needs prompt attention.",
    },
    recommendations: {
      low: "Include potassium-rich foods (bananas, potatoes, spinach, beans). Seek advice if on diuretics.",
      high: "Avoid potassium supplements/salt substitutes and contact a clinician promptly, especially if you have kidney issues.",
    },
  },
  tsh: {
    aliases: ["tsh", "thyroid stimulating hormone", "thyrotropin"],
    unit: "mIU/L",
    range: { low: 0.4, high: 4.0 },
    category: "Thyroid",
    explanation: {
      low: "TSH is low, which may suggest an overactive thyroid (hyperthyroidism) — possible symptoms include weight loss, rapid heartbeat, or anxiety.",
      high: "TSH is high, which may suggest an underactive thyroid (hypothyroidism) — possible symptoms include fatigue, weight gain, or cold intolerance.",
    },
    recommendations: {
      low: "Consult an endocrinologist for thyroid hormone testing (T3/T4) and management.",
      high: "Consult an endocrinologist for thyroid hormone testing (T3/T4) and management.",
    },
  },
  vitamin_d: {
    aliases: ["vitamin d", "25-hydroxy vitamin d", "25-oh vitamin d", "vitamin d, 25-oh"],
    unit: "ng/mL",
    range: { low: 30, high: 100 },
    category: "Vitamins",
    explanation: {
      low: "Vitamin D is below the healthy range, which can affect bone health and immune function, and may cause fatigue or muscle aches.",
      high: "Vitamin D is above the typical range, usually from excess supplementation, and can cause high calcium levels.",
    },
    recommendations: {
      low: "Get moderate sunlight, eat vitamin-D-rich foods (fatty fish, eggs, fortified dairy), and discuss supplementation with a doctor.",
      high: "Review supplements with a clinician and reduce intake if advised.",
    },
  },
  vitamin_b12: {
    aliases: ["vitamin b12", "b12", "cobalamin"],
    unit: "pg/mL",
    range: { low: 200, high: 900 },
    category: "Vitamins",
    explanation: {
      low: "Vitamin B12 is low, which can cause fatigue, tingling, or memory issues and may lead to anaemia.",
      high: "Vitamin B12 is above the typical range, usually from supplementation and rarely harmful.",
    },
    recommendations: {
      low: "Include B12-rich foods (fish, meat, eggs, dairy) or supplements if vegetarian/vegan. Consult a doctor if neurological symptoms appear.",
      high: "Review supplementation with a clinician.",
    },
  },
  alt: {
    aliases: ["alt", "sgpt", "alanine aminotransferase"],
    unit: "U/L",
    range: { low: 7, high: 56 },
    category: "Liver",
    explanation: {
      low: "ALT is below the typical range, which is rarely clinically significant.",
      high: "ALT is elevated, which can indicate liver inflammation from fatty liver, alcohol, medication, or infection.",
    },
    recommendations: {
      low: "No specific action usually required.",
      high: "Limit alcohol, review medications with a doctor, maintain a healthy weight, and get follow-up liver testing.",
    },
  },
  ast: {
    aliases: ["ast", "sgot", "aspartate aminotransferase"],
    unit: "U/L",
    range: { low: 10, high: 40 },
    category: "Liver",
    explanation: {
      low: "AST is below the typical range, which is rarely clinically significant.",
      high: "AST is elevated, which can reflect liver or muscle inflammation and warrants follow-up.",
    },
    recommendations: {
      low: "No specific action usually required.",
      high: "Limit alcohol, review medications, and consult a clinician for further liver evaluation.",
    },
  },
  bilirubin: {
    aliases: ["bilirubin", "total bilirubin", "tbil", "s. bilirubin"],
    unit: "mg/dL",
    range: { low: 0.1, high: 1.2 },
    category: "Liver",
    explanation: {
      low: "Bilirubin is below the typical range, which is generally not a concern.",
      high: "Bilirubin is elevated, which can cause jaundice (yellowing of skin/eyes) and may indicate liver or red blood cell issues.",
    },
    recommendations: {
      low: "No specific action usually required.",
      high: "Seek medical evaluation for liver and blood tests if you notice yellowing of skin or eyes.",
    },
  },
};

export const CATEGORIES = [
  "Hematology",
  "Metabolic",
  "Lipids",
  "Renal",
  "Electrolytes",
  "Thyroid",
  "Vitamins",
  "Liver",
];

export function findTestByName(rawName) {
  const name = rawName.toLowerCase().trim();
  for (const [key, entry] of Object.entries(MEDICAL_DB)) {
    if (entry.aliases.some((alias) => name === alias || name.includes(alias))) {
      return { key, ...entry };
    }
  }
  return null;
}
