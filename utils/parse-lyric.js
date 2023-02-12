// 正则匹配时间 [00:11.22]
const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
export function parseLyric(lyricString) {
  // 每一行转成数组
  const lyricStrings = lyricString.split('\n')
  // console.log(lyricStrings);
  // 每一句转成 {时间:歌词}
  const lyricInfos = []
  for (const line of lyricStrings) {
    const timeResult = timeRegExp.exec(line)
    if (!timeResult) continue
    const minute = timeResult[1] * 60 * 1000
    const second = timeResult[2] * 1000
    const millsecondTime = timeResult[3]
    const millsecond = millsecondTime.length === 2 ? millsecondTime * 10 : millsecondTime * 1
    const time = minute + second + millsecond
    const text = line.replace(timeRegExp, "")
    if(text==="") continue
   lyricInfos.push({
      time,
      text
    })
  }
  // console.log(lyricInfos);
  return lyricInfos
}