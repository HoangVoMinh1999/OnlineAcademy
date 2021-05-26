import React,{Component} from 'react'
import LeftMenu from '../../Components/leftMenu'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import CourseList from '../../Components/Course/CourseList'
import CourseInfo from '../../Components/Course/CourseInfo'

export default class Category extends Component {
    render() {
        return (
            <div>
                <LeftMenu></LeftMenu>
                <div class="all-content-wrapper">
                    <Header></Header>
                    <CourseInfo></CourseInfo>
                    <Footer></Footer>
                </div>
            </div>
        )
    }
}