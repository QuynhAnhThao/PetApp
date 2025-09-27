// const User = require('../models/User');


// class Chain {
//     constructor() {
//         this.nextHandler = null;
//     }

//     async handle(req, res, next) {
//         console.log(this?.nextHandler)
//         if (this?.nextHandler) {
//             return this.nextHandler.handle((req, res, next));
//         }
//         return next();
//     }

//     setNext(handler) {
//         this.nextHandler = handler;
//         console.log(this.nextHandler)
//         return handler;
//     }
// }

// class Protect extends Chain {
//     async handle(req, res, next) {
//         try {
//             const authHeader = req.headers.authorization || '';
//             const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

//             if (!token) return res.status(401).json({ message: 'No token, unauthorized' });

//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             const user = await User.findById(decoded.id).lean();

//             if (!user) return res.status(401).json({ message: 'User not found' });

//             req.user = { id: String(user._id), role: user.role || 'staff' };
//             next();
//         } catch (err) {
//             return res.status(401).json({ message: 'Invalid token' });
//         }
//     }
// }

// module.exports = { Chain, Protect };



const jwt = require('jsonwebtoken');
const User = require('../models/User');

class Chain {
  constructor() {
    this.nextHandler = null;
  }

  setNext(handler) {
    this.nextHandler = handler;
    return handler; // allows chaining: a.setNext(b).setNext(c)
  }

  async handle(req, res, next) {
    if (this.nextHandler) {
      return this.nextHandler.handle(req, res, next); // pass THREE args
    }
    return next(); // end of chain -> move to Express next()
  }
}

class Protect extends Chain {
  async handle(req, res, next) {
    try {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
      if (!token) return res.status(401).json({ message: 'No token, unauthorized' });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).lean();
      if (!user) return res.status(401).json({ message: 'User not found' });

      req.user = { id: String(user._id), role: user.role || 'staff' };
      return super.handle(req, res, next); // continue the chain
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}

// Optional: role-check step (admin only)
class AdminOnly extends Chain {
  async handle(req, res, next) {
    if (!req.user || String(req.user.role).toLowerCase() !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: admin only' });
    }
    return super.handle(req, res, next);
  }
}

module.exports = { Chain, Protect, AdminOnly };
