import faker



fake=faker.Faker()

def data_faker():
    return{
        "name": fake.name(),
        "year of birth": fake.year(),
        "address": fake.address()
    }
