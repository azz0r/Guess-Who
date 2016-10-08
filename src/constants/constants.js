export const environmentConstants = {
  'development': {
    baseUrl:
     '/'
  },
  'production': {
    baseUrl: 'https://azz0r.github.io/guess-who/'
  }
}

let
  constants,
  env = process.env.BUILD || process.env.NODE_ENV || 'development',
  finalEnvironmentConstants = environmentConstants[env]


constants = Object.assign({}, finalEnvironmentConstants)

export default constants
