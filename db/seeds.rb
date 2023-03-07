# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# User.create({username: "hotdoggity", password: "cornchip123", avatar_image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.0aEU6jSQwAlQsEWf2LroMQHaHa%26pid%3DApi&f=1&ipt=99c6b96478b3874ee9c3b059a43d2177a1482a319a7c9cbd26e87dcaf63ed594&ipo=images", about: "its me >:3"})
# Trail.create({name: "Pretty Lake Stroll", location: "Sweetberry Park, MI, USA", description: "A lovely walk", image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.o7a4Egi2WcrNNkmrfbhL6wHaDZ%26pid%3DApi&f=1&ipt=3f9957369bdb166963f362efdebfc777907666002946e278ef7f9c2f33372188&ipo=images", distance: 3.5, intensity: 2})
Hike.create({user_id: 1, trail_id: 1, rating: 4, notes: "had a lovely stroll here with my niece !", date: "2023-03-02", image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.E2GKVh09sXs2Evm11dmHbAHaEL%26pid%3DApi%26h%3D160&f=1&ipt=1a93a5e5c451e75a5229898fe97c9eb2f4e7425d207a8f89504b09a9fdc99cc5&ipo=images"})
