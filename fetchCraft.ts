import { Combination } from './Combination'
import { Craft } from './Craft'
import { cookie } from './cookie'

export async function fetchCraft({ first, second }: Combination): Promise<Craft> {
  const result = await rawFetchCraft(first, second)
  const data = (await result.json()) as Craft
  return data
}

function rawFetchCraft(first: string, second: string) {
  const url = `https://neal.fun/api/infinite-craft/pair?first=${first}&second=${second}`
  return fetch(url, {
    headers: {
      accept: '*/*',
      'accept-language': 'en-GB,en;q=0.9',
      'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      cookie,
      Referer: 'https://neal.fun/infinite-craft/',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
    body: null,
    method: 'GET',
  })
}
