import re

with open('SimilarDiseaseScreen.tsx', 'r') as f:
    content = f.read()

# Modify availableData definition
old_filter = """  // Filter the data BEFORE rendering the UI
  const availableData = DISEASE_DATA.filter(item => {
    return hasValidDiseaseImage(item.baseDisease.id, item.baseDisease.image);
  }).map(item => {"""

new_filter = """  const ALLOWED_INDICES = [0, 1, 2, 3, 6]; // 1, 2, 3, 4, 7

  // Filter the data BEFORE rendering the UI
  const availableData = DISEASE_DATA.map((item, index) => ({
    ...item,
    displayNumber: index + 1
  })).filter((item, index) => {
    if (!ALLOWED_INDICES.includes(index)) return false;
    return hasValidDiseaseImage(item.baseDisease.id, item.baseDisease.image);
  }).map(item => {"""

content = content.replace(old_filter, new_filter)

# Modify the render loop to use displayNumber
old_render = """                <View className="w-8 h-8 rounded-full bg-clinical-teal/20 items-center justify-center mr-3">
                  <Text className="text-clinical-teal font-bold">{index + 1}</Text>
                </View>"""

new_render = """                <View className="w-8 h-8 rounded-full bg-clinical-teal/20 items-center justify-center mr-3">
                  <Text className="text-clinical-teal font-bold">{item.displayNumber}</Text>
                </View>"""

content = content.replace(old_render, new_render)

with open('SimilarDiseaseScreen.tsx', 'w') as f:
    f.write(content)

print('Modified SimilarDiseaseScreen.tsx')
