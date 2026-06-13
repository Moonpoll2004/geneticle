export interface InfoCard{
  Description: string;
  KeyFeatures: string[];

}

export interface Syndrome {
  name: string;
  initialPrompt: { age: string; complaint: string };
  clues: string[];
  infoCard?: InfoCard;
}

export interface Attempt {
  guess: string;
  correct: boolean;
}

export type GameState = "playing" | "won" | "lost";

// ─── Data ─────────────────────────────────────────────────────────────────────

export const SYNDROMES: Syndrome[] = [
  {
    name: "Down Syndrome (Trisomy 21)",
    initialPrompt: { age: "Newborn, 1 day old", complaint: "Hypotonia and facial features" },
    clues: ["Upslanting palpebral fissures", "Hypotonia", "AV septal defect", "Trisomy 21", "Duodenal atresia", "Hypothyroidism"],
    infoCard: { Description: "Chromosomal trisomy 21.", KeyFeatures: ["Characteristic facial features", "Cardiac defects", "Trisomy 21 confirmation"] }
  },
  {
    name: "Turner Syndrome (45,X)",
    initialPrompt: {
      age: "14-year-old female",
      complaint:
        "Primary amenorrhea and short stature; mother concerned she hasn't started puberty",
    },
    clues: [
      "Height is 143 cm — significantly below the 3rd percentile for age",
      "Webbing of the neck (pterygium colli) and low posterior hairline noted",
      "Cardiac auscultation reveals a systolic murmur; echo shows bicuspid aortic valve",
      "Pelvic ultrasound shows streak gonads (gonadal dysgenesis)",
      "Karyotype: 45,X",
      "LH and FSH levels markedly elevated (hypergonadotropic hypogonadism)",
    ],
    infoCard: {
      Description: "A sex chromosome aneuploidy in phenotypic females causing short stature, ovarian failure and variable congenital features.",
      KeyFeatures: [
        "Short stature and primary amenorrhea",
        "Cardiac anomalies (eg. bicuspid aortic valve)",
        "Karyotype 45,X confirms diagnosis",
      ],
    },
  },
  {
    name: "Marfan Syndrome",
    initialPrompt: {
      age: "17-year-old male",
      complaint:
        "Referred by school nurse after routine vision screening flagged myopia; also notably tall for his age",
    },
    clues: [
      "Arm span exceeds height; arachnodactyly (long, slender fingers) present",
      "Positive wrist sign (Walker) and thumb sign (Steinberg)",
      "Slit-lamp: bilateral superotemporal ectopia lentis",
      "Echocardiogram shows aortic root dilatation at the sinuses of Valsalva",
      "Pectus excavatum and high-arched palate noted on examination",
      "FBN1 gene mutation confirmed on molecular testing",
    ],
    infoCard: {
      Description: "An autosomal dominant connective tissue disorder with tall stature, lens subluxation and risk of aortic root dilatation.",
      KeyFeatures: [
        "Arachnodactyly and hypermobile joints",
        "Ectopia lentis on slit-lamp exam",
        "Aortic root dilatation on echocardiogram",
      ],
    },
  },
  {
    name: "Klinefelter Syndrome (47,XXY)",
    initialPrompt: {
      age: "28-year-old male",
      complaint:
        "Presenting with infertility; semen analysis shows azoospermia. Also reports gynecomastia.",
    },
    clues: [
      "Testes are small and firm (approximately 2 mL volume bilaterally)",
      "FSH and LH elevated; testosterone low-normal",
      "Tall stature with long legs relative to trunk (eunuchoid proportions)",
      "Testicular biopsy shows hyalinisation of seminiferous tubules",
      "History of learning difficulties, particularly with language and reading",
      "Karyotype: 47,XXY",
    ],
    infoCard: {
      Description: "A sex chromosome aneuploidy in males characterized by small testes, infertility and tall stature; confirmed by karyotype.",
      KeyFeatures: [
        "Small firm testes and infertility",
        "Elevated FSH/LH with low-normal testosterone",
        "Karyotype 47,XXY",
      ],
    },
  },
  {
    name: "Neurofibromatosis Type 1 (NF1)",
    initialPrompt: {
      age: "8-year-old child",
      complaint:
        "Mother noticed multiple light-brown skin patches appearing over the past few years; child also complaining of blurry vision",
    },
    clues: [
      "Six or more café-au-lait macules >5 mm in diameter across the trunk",
      "Axillary freckling (Crowe's sign) present bilaterally",
      "Ophthalmology finds Lisch nodules (iris hamartomas) on slit-lamp exam",
      "MRI brain shows T2 hyperintensities in basal ganglia and cerebellum",
      "Plexiform neurofibroma palpable along the left arm",
      "NF1 gene mutation (chromosome 17q11.2) confirmed on genetic testing",
    ],
    infoCard: {
      Description: "A genetic tumour-predisposition disorder causing café-au-lait spots, neurofibromas and risk of optic pathway tumours.",
      KeyFeatures: [
        "Multiple café-au-lait macules and axillary freckling",
        "Lisch nodules on slit-lamp exam",
        "NF1 gene mutation confirmation",
      ],
    },
  },
  {
    name: "Fragile X Syndrome",
    initialPrompt: {
      age: "5-year-old male",
      complaint:
        "Referred by nursery for global developmental delay; limited speech, struggles to maintain eye contact",
    },
    clues: [
      "Macrocephaly with a long, narrow face and prominent forehead",
      "Large, prominent ears bilaterally",
      "Hyperextensible finger joints and flat feet noted",
      "Macroorchidism present (testicular volume above 95th percentile for age)",
      "Behavioural assessment consistent with autism spectrum disorder",
      "CGG repeat expansion (>200 repeats) in FMR1 gene on X chromosome",
    ],
    infoCard: {
      Description: "A common inherited cause of intellectual disability due to CGG repeat expansion in the FMR1 gene, often with characteristic facial features and behavioural differences.",
      KeyFeatures: [
        "Long face and large ears",
        "Macroorchidism after puberty",
        "FMR1 CGG repeat expansion on genetic testing",
      ],
    },
  },
  {
    name: "Prader-Willi Syndrome",
    initialPrompt: {
      age: "3-year-old child",
      complaint:
        "Referred for hyperphagia and significant weight gain; parents note the child is constantly seeking food",
    },
    clues: [
      "History of severe neonatal hypotonia and feeding difficulties requiring nasogastric tube",
      "Short stature, small hands and feet, hypogonadism",
      "Almond-shaped eyes; fair hair and skin relative to family members",
      "Mild intellectual disability and speech delay",
      "Methylation analysis of chromosome 15q11-q13 shows paternal deletion",
      "SNRPN gene methylation test confirms absent paternal methylation pattern",
    ],
    infoCard: {
      Description: "A neurodevelopmental disorder caused by loss of paternally expressed genes on 15q11-q13, featuring hypotonia, hyperphagia and developmental delay.",
      KeyFeatures: [
        "Neonatal hypotonia with feeding difficulties",
        "Hyperphagia leading to obesity",
        "Methylation or deletion at 15q11-q13",
      ],
    },
  },
  {
    name: "Angelman Syndrome",
    initialPrompt: {
      age: "2-year-old child",
      complaint:
        "Parents concerned about absent speech, frequent laughing, and a happy but hyperactive demeanour",
    },
    clues: [
      "Seizures began at 18 months; EEG shows high-amplitude spike-wave pattern",
      "Severe intellectual disability with absent or minimal speech",
      "Ataxic gait with tremulous limb movements",
      "Microcephaly developing over the first year of life",
      "Methylation analysis of chromosome 15q11-q13 shows maternal deletion",
      "UBE3A gene mutation or maternal uniparental disomy of chromosome 15 confirmed",
    ],
    infoCard: {
      Description: "A neurodevelopmental disorder with severe speech impairment, happy demeanour and seizures due to loss of maternal UBE3A expression.",
      KeyFeatures: [
        "Absent or minimal speech and ataxia",
        "Frequent laughter and happy affect",
        "UBE3A mutation or maternal deletion detected",
      ],
    },
  },
  {
    name: "Williams Syndrome",
    initialPrompt: {
      age: "18-month-old",
      complaint:
        "Referred for cardiac murmur; noted to be very sociable and talkative for age but developmentally delayed overall",
    },
    clues: [
      "Elfin facies: broad forehead, wide mouth, full lips, periorbital fullness",
      "Stellate iris pattern on ophthalmology review",
      "Echocardiogram shows supravalvular aortic stenosis",
      "Hypercalcaemia on blood tests",
      "FISH shows deletion of chromosome 7q11.23",
      "ELN (elastin) gene microdeletion confirmed",
    ],
    infoCard: {
      Description: "A microdeletion syndrome (7q11.23) characterised by distinctive facial features, cardiovascular disease and an overly sociable personality.",
      KeyFeatures: [
        "Supravalvular aortic stenosis and ELN deletion",
        "Elfin facies and developmental delay",
        "Characteristic social behaviour",
      ],
    },
  },
  {
    name: "DiGeorge Syndrome (22q11.2 deletion)",
    initialPrompt: {
      age: "Neonate, 3 days old",
      complaint:
        "Neonatal tetany with hypocalcaemia; congenital heart defect identified antenatally",
    },
    clues: [
      "Echocardiogram confirms truncus arteriosus (conotruncal heart defect)",
      "Absent thymic shadow on chest X-ray; T-cell lymphopaenia on lymphocyte subset analysis",
      "PTH undetectable — consistent with hypoparathyroidism",
      "Dysmorphic features: hypertelorism, low-set ears, fish-shaped mouth",
      "History of recurrent infections in the weeks following birth",
      "FISH confirms heterozygous deletion of chromosome 22q11.2 (TBX1 region)",
    ],
    infoCard: {
      Description: "A 22q11.2 microdeletion syndrome causing conotruncal cardiac defects, hypocalcaemia and variable immune deficiency.",
      KeyFeatures: [
        "Conotruncal cardiac anomalies (eg. truncus arteriosus)",
        "Hypocalcaemia due to hypoparathyroidism",
        "FISH or molecular testing confirms 22q11.2 deletion",
      ],
    },
  },
  {
    name: "Achondroplasia",
    initialPrompt: {
      age: "Newborn, 1 day old",
      complaint:
        "Midwife notices disproportionately short limbs; head appears large. Antenatal ultrasound was normal.",
    },
    clues: [
      "Rhizomelic shortening: humerus and femur disproportionately short",
      "Macrocephaly with frontal bossing; midface hypoplasia",
      "Lumbar lordosis and trident hand configuration",
      "X-ray: narrowed lumbar interpedicular distance and champagne-glass pelvis",
      "Both parents of average height — consistent with de novo mutation",
      "FGFR3 gain-of-function mutation (p.Gly380Arg) confirmed on molecular testing",
    ],
    infoCard: {
      Description: "The commonest cause of disproportionate short stature due to FGFR3 gain-of-function mutations, with characteristic radiological features.",
      KeyFeatures: [
        "Rhizomelic limb shortening and macrocephaly",
        "Characteristic X-ray findings (eg. narrowed interpedicular distance)",
        "FGFR3 p.Gly380Arg mutation",
      ],
    },
  },
  {
    name: "Huntington's Disease",
    initialPrompt: {
      age: "42-year-old male",
      complaint:
        "Wife concerned about involuntary jerking movements and personality changes over the past year; father died in a psychiatric institution",
    },
    clues: [
      "Chorea: involuntary, dance-like movements affecting face, trunk, and limbs",
      "Cognitive testing shows executive dysfunction and early dementia",
      "Psychiatric history includes irritability, depression, and impulsivity",
      "MRI brain shows caudate nucleus and putamen atrophy",
      "Autosomal dominant inheritance; 50% risk to offspring",
      "HTT gene CAG trinucleotide repeat expansion >36 repeats confirmed",
    ],
    infoCard: {
      Description: "An autosomal dominant neurodegenerative disorder caused by CAG repeat expansion in the HTT gene, featuring chorea and cognitive decline.",
      KeyFeatures: [
        "Progressive chorea and psychiatric changes",
        "Executive dysfunction and dementia",
        "HTT CAG repeat expansion on genetic testing",
      ],
    },
  },
  {
    name: "Phenylketonuria (PKU)",
    initialPrompt: {
      age: "Newborn, 10 days old",
      complaint:
        "Newborn bloodspot screen flagged an abnormal result; baby appears well but has a musty odour",
    },
    clues: [
      "Phenylalanine markedly elevated on tandem mass spectrometry",
      "Tyrosine low; phenylalanine-to-tyrosine ratio significantly raised",
      "Fair skin, blue eyes, and lighter hair than parents (hypopigmentation)",
      "If untreated: progressive intellectual disability, seizures, and behavioural problems",
      "Urine organic acids show phenylpyruvic acid (phenylketones)",
      "PAH gene mutation (phenylalanine hydroxylase deficiency) confirmed — autosomal recessive",
    ],
    infoCard: {
      Description: "An inherited metabolic disorder due to PAH deficiency leading to elevated phenylalanine; early detection and dietary treatment prevent severe neurodevelopmental impairment.",
      KeyFeatures: [
        "Markedly elevated phenylalanine on newborn screening",
        "Fair complexion and musty odour if untreated",
        "PAH gene mutation confirms diagnosis",
      ],
    },
  },
  {
    name: "Cystic Fibrosis",
    initialPrompt: {
      age: "6-week-old infant",
      complaint:
        "Failure to thrive and frequent bulky, greasy stools; newborn screen was positive",
    },
    clues: [
      "Sweat chloride test: 98 mmol/L (markedly elevated; >60 mmol/L is diagnostic)",
      "Steatorrhoea confirmed; faecal elastase markedly reduced (exocrine pancreatic insufficiency)",
      "Chest X-ray shows early hyperinflation with perihilar streaking",
      "Liver function mildly elevated; hepatomegaly on examination",
      "Autosomal recessive — both parents are carriers",
      "CFTR gene: compound heterozygous F508del/G551D mutations confirmed",
    ],
    infoCard: {
      Description: "An autosomal recessive disorder caused by CFTR mutations leading to thick secretions, lung disease and exocrine pancreatic insufficiency.",
      KeyFeatures: [
        "Elevated sweat chloride test",
        "Pancreatic insufficiency and failure to thrive",
        "CFTR mutation (eg. F508del) detected",
      ],
    },
  },
  {
    name: "Ehlers-Danlos Syndrome (Hypermobile type)",
    initialPrompt: {
      age: "19-year-old female",
      complaint:
        "Recurrent joint dislocations and chronic widespread pain since childhood; also reports easy bruising and stretchy skin",
    },
    clues: [
      "Beighton score 8/9 — generalised joint hypermobility confirmed",
      "Skin hyperextensibility: stretches >3 cm at the volar forearm",
      "Atrophic scarring and cigarette-paper skin texture over bony prominences",
      "Positive family history: mother and maternal aunt with similar hypermobility",
      "POTS diagnosed on tilt-table test",
      "No definitive molecular biomarker; diagnosis remains clinical per 2017 criteria",
    ],
    infoCard: {
      Description: "A connective tissue disorder characterised by joint hypermobility, skin findings and chronic pain; diagnosis is often clinical.",
      KeyFeatures: [
        "High Beighton score indicating hypermobility",
        "Skin hyperextensibility and atrophic scarring",
        "Diagnosis primarily clinical for hypermobile type",
      ],
    },
  },
  {
    name: "Methylmalonic Acidemia",
    initialPrompt: {
      age: "Newborn, 4 days old",
      complaint:
        "Poor feeding, vomiting, and lethargy after a seemingly normal first few days of life",
    },
    clues: [
      "Metabolic acidosis with an increased anion gap",
      "Ketonuria and hyperammonemia present",
      "Elevated methylmalonic acid in urine and blood",
      "Often presents after increased protein intake or illness",
      "Can be associated with vitamin B12 deficiency or defects in B12 metabolism",
      "Autosomal recessive disorder",
    ],
    infoCard: {
      Description: "An organic acidemia caused by methylmalonyl-CoA mutase deficiency or impaired vitamin B12 metabolism, leading to metabolic acidosis and hyperammonemia.",
      KeyFeatures: [
        "Elevated methylmalonic acid",
        "High anion gap metabolic acidosis",
        "May respond to vitamin B12 in some cases",
      ],
    },
  },
  {
    name: "Propionic Acidemia",
    initialPrompt: {
      age: "Newborn, 2 days old",
      complaint:
        "Vomiting, poor feeding, and worsening lethargy shortly after starting feeds",
    },
    clues: [
      "High anion gap metabolic acidosis",
      "Hyperammonemia and ketonuria",
      "Elevated propionic acid and abnormal acylcarnitine profile",
      "Can present with neutropenia and thrombocytopenia",
      "Odor described as sweaty feet in some cases",
      "Autosomal recessive disorder",
    ],
    infoCard: {
      Description: "An organic acidemia due to propionyl-CoA carboxylase deficiency, classically causing neonatal metabolic decompensation.",
      KeyFeatures: [
        "High anion gap metabolic acidosis",
        "Hyperammonemia",
        "Sweaty-feet odor",
      ],
    },
  },
  {
    name: "Isovaleric Acidemia",
    initialPrompt: {
      age: "Newborn, 3 days old",
      complaint:
        "Poor feeding, vomiting, and a strong unusual body odor noted by the family",
    },
    clues: [
      "Ketoacidosis with elevated anion gap",
      "Distinctive odor like sweaty feet",
      "Elevated isovaleric acid due to impaired leucine catabolism",
      "May cause vomiting, lethargy, and encephalopathy",
      "Leukopenia and thrombocytopenia can occur",
      "Autosomal recessive disorder",
    ],
    infoCard: {
      Description: "A leucine metabolism disorder caused by isovaleryl-CoA dehydrogenase deficiency, producing a characteristic odor and metabolic crisis.",
      KeyFeatures: [
        "Sweaty-feet odor",
        "Metabolic acidosis",
        "Defect in leucine breakdown",
      ],
    },
  },
  {
    name: "Maple Syrup Urine Disease",
    initialPrompt: {
      age: "Newborn, 5 days old",
      complaint:
        "Poor feeding, irritability, and progressive lethargy; urine smells sweet",
    },
    clues: [
      "Branched-chain amino acids elevated: leucine, isoleucine, and valine",
      "Ketosis and metabolic acidosis present",
      "Sweet maple syrup odor from urine and cerumen",
      "Can progress to seizures, coma, and death if untreated",
      "Defect in branched-chain alpha-ketoacid dehydrogenase complex",
      "Autosomal recessive disorder",
    ],
    infoCard: {
      Description: "An inherited disorder of branched-chain amino acid metabolism causing encephalopathy and a sweet odor.",
      KeyFeatures: [
        "Elevated branched-chain amino acids",
        "Sweet maple syrup odor",
        "Neonatal neurologic deterioration",
      ],
    },
  },
  {
    name: "Glutaric Acidemia Type I",
    initialPrompt: {
      age: "Infant, 7 months old",
      complaint:
        "Developmental delay with sudden neurologic regression after a febrile illness",
    },
    clues: [
      "Macrocephaly present since infancy",
      "Dystonia and choreoathetosis after metabolic stress",
      "MRI may show frontotemporal atrophy and widened sylvian fissures",
      "Elevated glutaric acid and 3-hydroxyglutaric acid in urine",
      "Defect in glutaryl-CoA dehydrogenase",
      "Autosomal recessive disorder",
    ],
    infoCard: {
      Description: "A lysine and tryptophan metabolism disorder that can cause acute striatal injury and movement disorders.",
      KeyFeatures: [
        "Macrocephaly",
        "Dystonia after illness",
        "Elevated glutaric acid in urine",
      ],
    },
  },
  {
    name: "Ornithine Transcarbamylase Deficiency",
    initialPrompt: {
      age: "Newborn, 2 days old",
      complaint:
        "Poor feeding and confusion with rapid deterioration after beginning protein feeds",
    },
    clues: [
      "Hyperammonemia with respiratory alkalosis",
      "Low BUN and elevated orotic acid in urine",
      "X-linked inheritance, more severe in males",
      "Can present later in life in heterozygous females",
      "Citrulline low",
      "Defect in the urea cycle enzyme ornithine transcarbamylase",
    ],
    infoCard: {
      Description: "The most common urea cycle defect, causing hyperammonemia and elevated urinary orotic acid due to mitochondrial carbamoyl phosphate shunting.",
      KeyFeatures: [
        "Hyperammonemia",
        "Elevated urinary orotic acid",
        "X-linked inheritance",
      ],
    },
  },
  {
    name: "Carbamoyl Phosphate Synthetase I Deficiency",
    initialPrompt: {
      age: "Newborn, 1 day old",
      complaint:
        "Severe lethargy and vomiting soon after birth with rapidly rising ammonia",
    },
    clues: [
      "Hyperammonemia with respiratory alkalosis",
      "Low citrulline and low orotic acid",
      "Urea cycle defect in the mitochondrial matrix",
      "BUN low because ammonia cannot enter the urea cycle effectively",
      "Can present with poor feeding, hypothermia, and seizures",
      "Autosomal recessive disorder",
    ],
    infoCard: {
      Description: "A proximal urea cycle defect causing severe neonatal hyperammonemia with low citrulline and low urinary orotic acid.",
      KeyFeatures: [
        "Low orotic acid",
        "Hyperammonemia",
        "Severe neonatal presentation",
      ],
    },
  },
  {
    name: "Citrullinemia Type I",
    initialPrompt: {
      age: "Newborn, 3 days old",
      complaint:
        "Vomiting, lethargy, and seizures with markedly elevated ammonia",
    },
    clues: [
      "Plasma citrulline markedly elevated",
      "Hyperammonemia and respiratory alkalosis",
      "Argininosuccinate synthetase deficiency",
      "May present with encephalopathy in the neonatal period",
      "Low BUN and poor feeding",
      "Autosomal recessive disorder",
    ],
    infoCard: {
      Description: "A urea cycle defect caused by argininosuccinate synthetase deficiency, producing elevated citrulline and hyperammonemia.",
      KeyFeatures: [
        "Markedly elevated citrulline",
        "Hyperammonemia",
        "Neonatal encephalopathy",
      ],
    },
  },
  {
    name: "Argininosuccinic Aciduria",
    initialPrompt: {
      age: "Newborn, 4 days old",
      complaint:
        "Poor feeding and irritability; baby is increasingly sleepy and breathing rapidly",
    },
    clues: [
      "Elevated argininosuccinate in plasma and urine",
      "Hyperammonemia with respiratory alkalosis",
      "May have brittle hair (trichorrhexis nodosa)",
      "Defect in argininosuccinate lyase",
      "Urea cycle defect inherited in an autosomal recessive pattern",
      "Citrulline elevated",
    ],
    infoCard: {
      Description: "A urea cycle disorder caused by argininosuccinate lyase deficiency, associated with hyperammonemia and brittle hair.",
      KeyFeatures: [
        "Elevated argininosuccinate",
        "Brittle hair",
        "Hyperammonemia",
      ],
    },
  },
  {
    name: "Arginase Deficiency",
    initialPrompt: {
      age: "6-year-old child",
      complaint:
        "Progressive spasticity and developmental regression rather than severe neonatal crisis",
    },
    clues: [
      "Spastic diplegia and hyperreflexia are prominent",
      "Hyperammonemia is usually milder than other urea cycle defects",
      "Arginine markedly elevated",
      "Can cause intellectual disability and growth delay",
      "Defect in arginase, the final step of the urea cycle",
      "Autosomal recessive disorder",
    ],
    infoCard: {
      Description: "A urea cycle disorder with elevated arginine and progressive spasticity, often presenting later than other cycle defects.",
      KeyFeatures: [
        "Elevated arginine",
        "Progressive spasticity",
        "Later childhood presentation",
      ],
    },
  },
  {
    name: "Noonan Syndrome",
    initialPrompt: {
      age: "7-year-old boy",
      complaint:
        "Short stature and a congenital heart murmur noted since infancy",
    },
    clues: [
      "Hypertelorism with downslanting palpebral fissures and low-set ears",
      "Webbed neck and pectus deformity",
      "Pulmonary valve stenosis on echocardiogram",
      "Cryptorchidism may be present in affected males",
      "Usually autosomal dominant with variable expression",
      "RAS/MAPK pathway mutation such as PTPN11",
    ],
    infoCard: {
      Description: "A rasopathy causing short stature, characteristic facies, congenital heart disease, and sometimes developmental delay.",
      KeyFeatures: [
        "Pulmonary valve stenosis",
        "Webbed neck and hypertelorism",
        "Autosomal dominant rasopathy",
      ],
    },
  },
  {
    name: "Beckwith-Wiedemann Syndrome",
    initialPrompt: {
      age: "Newborn, 1 day old",
      complaint:
        "Large baby with low blood glucose shortly after birth",
    },
    clues: [
      "Macrosomia and macroglossia",
      "Omphalocele or umbilical hernia may be present",
      "Neonatal hypoglycemia due to islet cell hyperplasia",
      "Ear creases and hemihyperplasia can be seen",
      "Increased risk of Wilms tumor and hepatoblastoma",
      "Imprinting defect at chromosome 11p15",
    ],
    infoCard: {
      Description: "An overgrowth syndrome due to imprinting abnormalities at 11p15, classically associated with macroglossia, organomegaly, and tumor risk.",
      KeyFeatures: [
        "Macroglossia and macrosomia",
        "Neonatal hypoglycemia",
        "Wilms tumor risk",
      ],
    },
  },
  {
    name: "Rett Syndrome",
    initialPrompt: {
      age: "18-month-old girl",
      complaint:
        "Loss of hand skills and speech after apparently normal early development",
    },
    clues: [
      "Hand-wringing movements are characteristic",
      "Developmental regression after 6 to 18 months",
      "Decelerating head growth leading to acquired microcephaly",
      "Autistic features and gait abnormalities",
      "Usually seen in girls",
      "MECP2 mutation on the X chromosome",
    ],
    infoCard: {
      Description: "An X-linked dominant neurodevelopmental disorder that primarily affects girls and causes developmental regression.",
      KeyFeatures: [
        "Hand-wringing stereotypies",
        "Developmental regression",
        "MECP2 mutation",
      ],
    },
  },
  {
    name: "Apert Syndrome",
    initialPrompt: {
      age: "Newborn, 1 day old",
      complaint:
        "Abnormal head shape and fused fingers noted at birth",
    },
    clues: [
      "Craniosynostosis with turribrachycephaly",
      "Syndactyly of the hands and feet",
      "Midface hypoplasia",
      "Often due to FGFR2 gain-of-function mutation",
      "Can be associated with developmental delay",
      "Autosomal dominant inheritance, often de novo",
    ],
    infoCard: {
      Description: "A craniosynostosis syndrome characterized by premature suture fusion and complex syndactyly.",
      KeyFeatures: [
        "Craniosynostosis",
        "Syndactyly",
        "FGFR2 mutation",
      ],
    },
  },
  {
    name: "Crouzon Syndrome",
    initialPrompt: {
      age: "Infant, 8 months old",
      complaint:
        "Abnormal skull shape and bulging eyes noticed by parents",
    },
    clues: [
      "Craniosynostosis with proptosis",
      "Midface hypoplasia and beaked nose",
      "Normal hands and feet, unlike Apert syndrome",
      "Often due to FGFR2 mutation",
      "Intellect is usually normal",
      "Autosomal dominant inheritance",
    ],
    infoCard: {
      Description: "A craniosynostosis syndrome with facial deformity and proptosis but without limb syndactyly.",
      KeyFeatures: [
        "Craniosynostosis and proptosis",
        "Midface hypoplasia",
        "Normal limbs",
      ],
    },
  },
  {
    name: "Treacher Collins Syndrome",
    initialPrompt: {
      age: "Newborn, 1 day old",
      complaint:
        "Facial asymmetry and difficulty opening the eyes noted at birth",
    },
    clues: [
      "Downslanting palpebral fissures and malformed zygomatic bones",
      "Micrognathia and ear anomalies",
      "Conductive hearing loss due to ossicle abnormalities",
      "Lower eyelid coloboma can be present",
      "Usually due to TCOF1 mutation",
      "Autosomal dominant inheritance with variable expressivity",
    ],
    infoCard: {
      Description: "A first and second branchial arch disorder causing mandibulofacial dysostosis and conductive hearing loss.",
      KeyFeatures: [
        "Hypoplastic zygomatic arches",
        "Micrognathia",
        "Conductive hearing loss",
      ],
    },
  },
  {
    name: "Smith-Lemli-Opitz Syndrome",
    initialPrompt: {
      age: "Newborn, 2 days old",
      complaint:
        "Multiple congenital anomalies and feeding difficulty",
    },
    clues: [
      "Microcephaly and developmental delay",
      "2-3 toe syndactyly is classic",
      "Micrognathia and ptosis can be present",
      "Ambiguous genitalia in some affected infants",
      "Defect in cholesterol synthesis due to 7-dehydrocholesterol reductase deficiency",
      "Low cholesterol and elevated 7-dehydrocholesterol",
    ],
    infoCard: {
      Description: "A cholesterol biosynthesis disorder with characteristic toe syndactyly, developmental delay, and multiple congenital anomalies.",
      KeyFeatures: [
        "2-3 toe syndactyly",
        "Low cholesterol",
        "Developmental delay",
      ],
    },
  },
  {
    name: "VACTERL Association",
    initialPrompt: {
      age: "Newborn, 1 day old",
      complaint:
        "Multiple congenital anomalies identified after birth",
    },
    clues: [
      "Vertebral anomalies",
      "Anal atresia",
      "Cardiac defects",
      "Tracheoesophageal fistula or esophageal atresia",
      "Renal anomalies",
      "Limb abnormalities such as radial ray defects",
    ],
    infoCard: {
      Description: "A nonrandom association of congenital anomalies involving vertebral, anal, cardiac, tracheoesophageal, renal, and limb defects.",
      KeyFeatures: [
        "Multiple congenital anomalies",
        "No single gene defect in most cases",
        "Classic VACTERL pattern",
      ],
    },
  },
  {
    name: "Kallmann Syndrome",
    initialPrompt: {
      age: "15-year-old male",
      complaint:
        "Delayed puberty and absent sense of smell",
    },
    clues: [
      "Hypogonadotropic hypogonadism",
      "Anosmia or hyposmia",
      "Delayed or absent secondary sexual characteristics",
      "May have cryptorchidism or micropenis in infancy",
      "Failure of GnRH neuron migration",
      "Can be associated with KAL1 or FGFR1 mutations",
    ],
    infoCard: {
      Description: "A disorder of GnRH neuron migration causing anosmia and delayed puberty due to hypogonadotropic hypogonadism.",
      KeyFeatures: [
        "Anosmia",
        "Delayed puberty",
        "Low LH and FSH",
      ],
    },
  },
  {
    name: "Lynch Syndrome",
    initialPrompt: {
      age: "38-year-old adult",
      complaint:
        "Strong family history of colon and endometrial cancer",
    },
    clues: [
      "Early-onset colorectal cancer",
      "Endometrial cancer risk is increased",
      "Microsatellite instability on tumor testing",
      "Defect in DNA mismatch repair genes such as MLH1, MSH2, MSH6, or PMS2",
      "Autosomal dominant inheritance",
      "May be associated with sebaceous neoplasms in some families",
    ],
    infoCard: {
      Description: "An inherited DNA mismatch repair defect causing microsatellite instability and increased risk of colorectal and endometrial cancer.",
      KeyFeatures: [
        "Mismatch repair defect",
        "Microsatellite instability",
        "Colon and endometrial cancer risk",
      ],
    },
  },

];