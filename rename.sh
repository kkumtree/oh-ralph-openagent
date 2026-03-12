#!/bin/bash

# 1. 대상 에이전트 배열 선언
AGENTS=(
  "sisyphus" "hephaestus" "oracle" "librarian" "explore" 
  "multimodal-looker" "prometheus" "metis" "momus" "atlas"
)

echo "🚀 에이전트 '-light' 일괄 변환을 시작합니다..."

for AGENT in "${AGENTS[@]}"; do
  # 2. 파일명 변경 (src/agents 내부 파일)
  if [ -f "src/agents/$AGENT.ts" ]; then
    mv "src/agents/$AGENT.ts" "src/agents/$AGENT-light.ts"
    echo "✅ 파일명 변경 완료: $AGENT.ts -> $AGENT-light.ts"
  fi

  # 3. 코드 내부 문자열 치환 (src 폴더 내의 .ts 및 .json 파일 대상)
  # perl을 사용하여 단어 경계(\b)를 기준으로 정확히 일치하는 이름만 찾아 '-light'를 붙임
  # (부정형 전방탐색 '(?!-light)'을 사용해 이미 sisyphus-light인 경우 sisyphus-light-light가 되는 것을 방지)
  find src/ -type f \( -name "*.ts" -o -name "*.json" \) -exec perl -pi -e "s/\b$AGENT\b(?!-light)/$AGENT-light/g" {} +
done

echo "🎉 모든 치환 작업이 완료되었습니다! 파일들을 확인해 보세요."
