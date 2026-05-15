import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        // match:[/.+\@.+\..+/, "Please enter a valid email address"]
    },
    password:{
        type: String,
        required: true,
        // minLength: 6
    },
    cartData: {
        type: Map,
        default: {}
    },
    role:{
        type: String,
        enum: ["customer","admin"],
        default:"customer"
    },
},{
    timestamps: true,
    minimize: false,
    // minimize is like do not remove empty objects while saving
})

export const User =
  mongoose.models.User ||
  mongoose.model("User", userSchema)

// // before saving the password in the db it hashes the password 
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next()

//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)

//     next();
// })

// // when loging in this matches the entered password with the db password of the user
// userSchema.methods.matchPassword = async(enterPassword) => {
//     return await bcrypt.compare(enterPassword, this.password)
// }

// module.exports = mongoose.model("User", userSchema);