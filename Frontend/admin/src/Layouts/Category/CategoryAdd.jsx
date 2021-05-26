import React,{Component} from 'react'
import LeftMenu from '../../Components/leftMenu'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import CategoryAdd from '../../Components/Category/CategoryAdd'

export default class Category extends Component {
    render() {
        return (
            <div>
                <LeftMenu></LeftMenu>
                <div class="all-content-wrapper">
                    <Header></Header>
                    <CategoryAdd></CategoryAdd>
                    <Footer></Footer>
                </div>
            </div>
        )
    }
}