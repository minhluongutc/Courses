const Enrollment = require('../models/Enrollment');

class EnrollmentMiddleware {
  static async checkEnrollment(accountId, courseId) {
    const enrollment = await Enrollment.findOne({ 
      accountId, 
      courseId
    });
    return !!enrollment; // return true nếu đã đăng ký, false nếu chưa đăng ký
  }
  
  static async checkEnrollmentMiddleware(req, res, next) {
    const { accountId, courseId } = req.query;
    const isEnrolled = await EnrollmentMiddleware.checkEnrollment(accountId, courseId);
    if (isEnrolled ) {
      // Cho phép truy cập nội dung khóa học
      next();
    } else {
      // Chuyển hướng đến trang thông báo không có quyền truy cập
      res.status(500).json('Chưa đăng ký khóa học')
    }
  };
}



module.exports = new EnrollmentMiddleware();

  