import json
import pandas

# df = pandas.read_csv('questions.csv', encoding='utf-8')
# parsed = {"questions":[]}

# for row in df.iterrows():
#     parsed["questions"].append({
#         "questionId": row[1]['id'],
#         "options": [
#             row[1]['opt0'],
#             row[1]['opt1'],
#             row[1]['opt2'],
#             row[1]['opt3'],
#             row[1]['opt4'],
#         ]
#     })

# with open('questions.json', 'w', encoding='utf-8') as f:
#     json.dump(parsed, f, indent=4, ensure_ascii=False)

df = pandas.read_csv('test.csv')

parsed = {}

for row in df.iterrows():
    parsed[row[0] + 1] = int(row[1]['note'])

with open('payload.json', 'w') as f:
    json.dump(parsed, f, indent=4)