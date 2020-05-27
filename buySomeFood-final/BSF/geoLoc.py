import requests

def geo_location(request):
    key = ''
    apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
    request_args = request.args
    if request_args and 'coords' in request_args:
        #here we call the api
        apiUrl += request_args['coords']
        apiUrl += '&key='
        apiUrl += key
        r = requests.get(url=apiUrl)
        data = r.json()
        return data['results'][0]['address_components'][2]['long_name']
    else:
        return 'Not Found'

def geo_locTest(latlng):
    key = ''
    apiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
    apiUrl += latlng
    apiUrl += '&key='
    apiUrl += key
    r = requests.get(url=apiUrl)
    data = r.json()
    print(data['results'][0]['address_components'][2]['long_name'])
    print(data['results'][0]['formatted_address'])

print(requests.get(url='https://us-central1-bsffinal.cloudfunctions.net/listSupermarkets?coords=47.744999,26.662130').json()[0])