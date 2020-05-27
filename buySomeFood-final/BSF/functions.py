import requests


def placeOrder(id,msg,addr):
    urlApi = 'https://us-central1-bsffinal.cloudfunctions.net/insertDatastore?table=orders&clnt='
    urlApi += id
    urlApi += ('&msg='+msg)
    urlApi += '&addr='
    urlApi += addr
    requests.get(url=urlApi)

def tookOrder(id,email):
    urlApi = 'https://us-central1-bsffinal.cloudfunctions.net/selectDatastore?table=orders&clnt='
    urlApi += id
    deleteApi = 'https://us-central1-bsffinal.cloudfunctions.net/delete?table=orders&clnt='
    deleteApi += id
    insertApi = 'https://us-central1-bsffinal.cloudfunctions.net/insertDatastore?table=comenzi&vol='
    insertApi += email
    r = requests.get(url=urlApi)
    dt = r.json()
    requests.get(deleteApi)
    if len(dt)>0:
        keys = dt[0].keys()
        for i in keys:
            insertApi += ('&'+i+'='+dt[0][i])
        insertApi += '&status=active'
        requests.get(insertApi)
    print(dt)

def getActive(id):
    urlApi = 'https://us-central1-bsffinal.cloudfunctions.net/selectDatastore?table=comenzi&status=active'
    if id == None:
        r = requests.get(urlApi)
        dt = r.json()
        print(dt)
    else:
        r = requests.get(urlApi + '&vol=' + id)
        vols = r.json()
        r = requests.get(urlApi + '&clnt=' + id)
        clnts = r.json()
        if len(vols) > 0:
            print(vols)
        else:
            print(clnts)

def getHistoryReceived(id):
    urlApi = 'https://us-central1-bsffinal.cloudfunctions.net/selectDatastore?table=comenzi&status=delivered'
    data = (requests.get(urlApi+'&clnt='+id)).json()
    print(data)

def getHistoryDelivered(id):
    urlApi = 'https://us-central1-bsffinal.cloudfunctions.net/selectDatastore?table=comenzi'
    data = (requests.get(urlApi+'&vol='+id)).json()
    print(data)

def confirmDelivery(id):
    urlApi = 'https://us-central1-bsffinal.cloudfunctions.net/update?table=comenzi&vol=' + id + '&status=active&status*=delivered'
    requests.get(urlApi)

# placeOrder('imailfake2','mesajfake2')
# tookOrder('imailfake','imfke2')
print((requests.get('https://us-central1-bsffinal.cloudfunctions.net/selectDatastore?table=comenzi')).json())
# getHistoryDelivered('imfke2')
# getActive(None)
# confirmDelivery('imfke2')
