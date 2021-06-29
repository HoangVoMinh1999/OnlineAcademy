import { CategoryService } from "./CategoryService";
import { CommentService } from "./CommentService";
import { CourseService } from "./CourseService";
import { LessonService } from "./LessonService";
import { PurchasedCourseService } from "./PurchasedCourseService";
import { UserService } from "./UserService";

export const categoryService = new CategoryService();

export const courseService = new CourseService();

export const lessonService = new LessonService();

export const userService = new UserService();

export const purchaseCourseService = new PurchasedCourseService();

export const commentService = new CommentService();