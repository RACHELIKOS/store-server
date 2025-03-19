import jwt from "jsonwebtoken";
let verify = jwt.verify;

export function isUserIn(req, res, next) {
    if (!req.headers.authorization)

        return res.status(401).json({ title: "מתשמש לא רשום", message: "קודם בצע כניסה או הרשמה" })
    let authorization = req.headers.authorization;
    // try {
    //     let result = verify(authorization, process.env.SECRET_KEY);
    //     req.u = result;
    //     return next()
    // }
    // catch (err) {
    //     return res.status(401).json({ title: "מתשמש לא רשום", message: "קודם בצע כניסה או הרשמה" + err.message })
    // }

    try {


        // אימות טוקן
        const result = verify(authorization, process.env.SECRET_KEY);
        req.u = result;

        // אם התפקיד לא מנהל
        if (result.role !== "user") {
            return res.status(403).json({ title: "אין לך רשות לבצע פעולה זו", message: "נדרשת השראת מנהל..." });
        }

        // המשך עם הבקשה אם הכל בסדר
        return next();

    } catch (err) {
        // שגיאה אם הטוקן לא תקין
        return res.status(401).json({ title: "מתשמש לא רשום", message: "קודם בצע כניסה או הרשמה: " + err.message });
    }


}
export function isUserManager(req, res, next) {
    console.log(req.headers.authorization + "njknjkn")
    if (!req.headers.authorization)

        return res.status(401).json({ title: "מתשמש לא רשום", message: "קודם בצע כניסה או הרשמה" })
    let authorization = req.headers.authorization;
    try {

        console.log(process.env.SECRET_KEY);
        let result = verify(authorization, process.env.SECRET_KEY);
        req.u = result;
        if (result.role != "MANAGER")
            return res.status(403).json({ title: "אין לך רשות לבצע פעולה זו", message: "נדרשת השראת מנהל...." + err.message })
        return next()
    }
    catch (err) {
        return res.status(401).json({ title: "מתשמש לא רשום", message: "קודם בצע כניסה או הרשמה" + err.message })
    }

}
