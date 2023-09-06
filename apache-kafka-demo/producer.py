import data
import kafka
import json
import time


def data_to_json():
    return json.dumps(data.data_faker()).encode("utf-8")


producer=kafka.KafkaProducer(bootstrap_servers=['localhost:9092'])

def produce():
    while 1==1:
        print("here")
        producer.send("registred_user",json.dumps(data.data_faker()).encode())
        time.sleep(3)
        
produce()