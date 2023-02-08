import {
  JCrequestdata
} from "./request";

export function getsongPlay(ids) {
  return JCrequestdata.get({
    url: "/song/detail",
    data: {
      ids
    }
  })
}