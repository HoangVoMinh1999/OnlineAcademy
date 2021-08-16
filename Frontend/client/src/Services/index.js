import { CategoryService } from "./CategoryService";
import { CommentService } from "./CommentService";
import { CourseService } from "./CourseService";
import { LessonService } from "./LessonService";
import { PurchasedCourseService } from "./PurchasedCourseService";
import { UserService } from "./UserService";
import { WatchListService } from "./WatchListService";

export const categoryService = new CategoryService();

export const courseService = new CourseService();

export const lessonService = new LessonService();

export const userService = new UserService();

export const purchasedCourseService = new PurchasedCourseService();

export const commentService = new CommentService();

export const watchlistService = new WatchListService();