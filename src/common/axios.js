import axios from 'axios'


export const getListData = async (strUrl, params = { limit: 100 }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: strUrl,
      params,
      timeout: 5000,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (res.data.status_code === 200) {
          resolve(res.data)

          return
        }

        reject(res.data)
      })
      .catch(e => {
        if (e.response) {
          reject(e.response.data)
        } else {
          reject({ description: 'Connection timeout. Please try again later..' })
        }
      })
  })
}

export const insertData = async (strUrl, data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: strUrl,
      data,
      timeout: 8000,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (res.data.status_code === 200 || res.data.status_code === 201) {
          resolve(res.data.payload)
          return
        }

        reject(res.data)
      })
      .catch(e => {
        if (e.response) {
          reject(e.response.data)
        } else {
          reject({ description: 'Connection timeout. Please try again later..' })
        }
      })
  })
}

export const editData = async (strUrl, data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: strUrl,
      data,
      timeout: 8000,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (res.data.status_code === 200 || res.data.status_code === 201) {
          resolve(res.data)
          return
        }
        console.log(res.data)
        reject(res.data)
      })
      .catch(e => {
        if (e.response) {
          reject(e.response.data)
        } else {
          reject({ description: 'Connection timeout. Please try again later..' })
        }
      })
  })
}

export const deleteData = async (strUrl) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'delete',
      url: strUrl,
      timeout: 4000,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (res.data.status_code === 200) {
          resolve(res.data.payload)
          return
        }

        reject(res.data)
      })
      .catch(e => {
        if (e.response) {
          reject(e.response.data)
        } else {
          reject({ description: 'Connection timeout. Please try again later..' })
        }
      })
  })
}
