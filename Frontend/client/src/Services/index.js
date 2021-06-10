import { CategoryService } from "./CategoryService";
import { CourseService } from "./CourseService";
import { LessonService } from "./LessonService";

export const categoryService = new CategoryService();

export const courseService = new CourseService();

export const lessonService = new LessonService();