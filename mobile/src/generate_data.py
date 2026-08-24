import os

with open('../../backend/class_names.txt', 'r') as f:
    classes = [line.strip() for line in f if line.strip()]

def normalize(name):
    return name.lower().replace(' ', '_').replace('(', '').replace(')', '').replace(',', '').replace('_-_', '_')

output = 'export const SIMILAR_DISEASE_IMAGES: Record<string, any> = {\n'
for c in classes:
    norm = normalize(c)
    output += f"  '{norm}': require('../../assets/diseases/{norm}.jpg'),\n"
output += '};\n\n'

output += 'export const DISEASE_DATA = [\n'
for idx, c in enumerate(classes):
    norm = normalize(c)
    similarClass = classes[(idx + 1) % len(classes)]
    normSimilar = normalize(similarClass)
    
    output += f"""  {{
    id: '{norm}',
    baseDisease: {{
      id: '{norm}',
      name: '{c}',
      image: SIMILAR_DISEASE_IMAGES['{norm}'],
      shortDescription: 'A condition categorized as {c}.',
      commonSigns: ['Varies by specific condition type', 'Consult a dermatologist for exact signs'],
    }},
    similarDiseases: [
      {{
        id: '{normSimilar}',
        name: '{similarClass}',
        image: SIMILAR_DISEASE_IMAGES['{normSimilar}'],
        whySimilar: 'May share similar visual characteristics or affected areas.',
        howDifferent: '{c} has distinct clinical features compared to {similarClass}.',
        commonSigns: ['Varies by specific condition', 'Requires clinical evaluation'],
        comparisonPoints: [
          {{ feature: 'Appearance', base: 'Specific to {c}', similar: 'Specific to {similarClass}' }},
          {{ feature: 'Severity', base: 'Varies', similar: 'Varies' }}
        ]
      }}
    ]
  }},
"""
output += '];\n'

with open('disease_data_generated.ts', 'w') as f:
    f.write(output)
