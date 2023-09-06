import kafka



consumer=kafka.KafkaConsumer('registred_user', group_id='my_favorite_group',bootstrap_servers=["localhost:9092"])

def consume():
    for msg in consumer:
        print(msg.value)
            
consume()   
