const Sequelize = require('sequelize')
const UserModel = require('../models/user')
const CompanyModel = require('../models/company')
const AirportModel = require('../models/airport')
const TrpiModel = require('../models/trip')
const ReservationModel = require('../models/reservation')
const FavListModel = require('../models/fav_list')
const MessengerUserModel = require('../models/messenger_user')
const TripStaffModel = require('../models/trip_staff')

const PlaneModel = require('../models/plane')
const StaffModel = require('../models/staff_member')

const sequelize = new Sequelize('airbot', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
 
})
const TripStaff = TripStaffModel(sequelize, Sequelize)

const User = UserModel(sequelize, Sequelize)
const Company = CompanyModel(sequelize, Sequelize)
const Airport = AirportModel(sequelize, Sequelize)
const Trip = TrpiModel(sequelize, Sequelize)
const Plane = PlaneModel(sequelize, Sequelize)
const Staff = StaffModel(sequelize, Sequelize)
const Reservation = ReservationModel(sequelize, Sequelize)
const FavList = FavListModel(sequelize, Sequelize)
const MessengerUser = MessengerUserModel(sequelize, Sequelize)

//Trip.hasOne(Airport)


Airport.hasMany(Trip,{foreignKey:"arrival_Airport",
as:"arrival_AirportA"
})
Airport.hasMany(Trip,{
  as:"leaving_AirportA",
  foreignKey:"leaving_Airport"
})

Trip.belongsTo(Airport,{
  foreignKey:"arrival_Airport",
  as:"arrival_AirportA"
});
Trip.belongsTo(Airport,{
  foreignKey:"leaving_Airport",
  as:"leaving_AirportA"

});


Plane.hasMany(Trip,{
  as:"planeA",
  foreignKey:"plane_id"
})

Trip.belongsTo(Plane,{
  foreignKey:"plane_id",
  as:"planeA"
});



Company.hasMany(Trip,{
  as:"companyA",
  foreignKey:"company_id"
})

Trip.belongsTo(Company,{
  foreignKey:"company_id",
  as:"companyA"
});




Trip.hasMany(Reservation,{
  as:"tripA",
  foreignKey:"trip_id"
})

Reservation.belongsTo(Trip,{
  foreignKey:"trip_id",
  as:"tripA"
});



/*

Plane.hasMany(Trip,{
  as:"planeA",
  foreignKey:"plane_id"
})
Trip.belongsTo(Plane,{
  foreignKey:"plane_id",
  as:"planeA"
});

*/

// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
/*
const BlogTag = sequelize.define('blog_tag', {})
const Blog = BlogModel(sequelize, Sequelize)
const Tag = TagModel(sequelize, Sequelize)

Blog.belongsToMany(Tag, { through: BlogTag, unique: false })
Tag.belongsToMany(Blog, { through: BlogTag, unique: false })
Blog.belongsTo(User);*
*/

/*

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })
*/
module.exports = {
  User,
  Company,
  Airport,
  Staff,
  Reservation,
  Plane,
  Trip,
  FavList,
  MessengerUser,
  TripStaff 
  


}


/*

	"data":{
       
  
            "arrival_Airport": 1,
     
            "leaving_Airport": "1",
            "seats_numer": null,
            "amount": null,
            "tax": 10.3,
            "discount": null,
            "final_Amount": null,
            "plane_id": null,
            "image": null,
            "desc": null,
            "company_id": 1,
            "createdAt": "2019-04-26T15:59:17.000Z",
            "updatedAt": "2019-04-26T15:59:17.000Z"
        }

*/