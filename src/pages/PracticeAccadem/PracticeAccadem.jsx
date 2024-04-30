import React, { useState } from 'react'
import { Layout } from '../../components';
import styles from "./PracticeAccadem.module.scss";
import AcaademForm from '../../components/Forms/AcaademForm/AcaademForm';
export default function PracticeAccadem() {
    // states
    const [top , setTop] = useState(0);
    const [left , setLeft] = useState(0);
    const [change , setChange] = useState(false)
    const handleClick = (e) =>{
    let target = e.target;
    if(target.className){
        const rect = target.getBoundingClientRect();;
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        setTop(offsetY);
        setLeft(offsetX);
        setChange(!change)
    }

}

  return (
    <Layout>
        <div className={styles.accadem__wrapper}>
            <div>
                <h3 className={styles.accadem__title}>calendar</h3>
            </div>
            <div className={styles.accadem__container}>
                <div className={styles.accadem__form}>
                    <div className={styles.form__body}>
                        <h3 className={styles.form__title}>Все События :</h3>
                        <div>

                        </div>
                    </div>
                </div>
            <div className={styles.accadem__calendar}>
                <h1 className={styles.calendar__title}>Month 2020</h1>
                <div className={styles.calendar__head}>

                    <div className={styles.head__item}>
                        <span>Monday</span>
                    </div>
                    <div className={styles.head__item}>
                        <span>Tuesday</span>
                    </div>
                    <div className={styles.head__item}>
                        <span>Wednesday</span>
                    </div>
                    <div className={styles.head__item}>
                        <span>Thursday</span>
                    </div>
                    <div className={styles.head__item}>
                        <span>Friday</span>
                    </div>
                    <div className={styles.head__item}>
                        <span>Saturday</span>
                    </div>
                    <div className={styles.head__item}>
                        <span>Sunday</span>
                    </div>
                </div>
                <div onClick={handleClick} className={styles.calendar__body}>

                    <div className={styles.body__track}>

                        <div className={styles.body__item}>
                            <span>1</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>2</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>3</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>4</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>5</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>6</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>7</span>
                        </div>
                    </div>
                    
                    <div className={styles.body__track}>

                        <div className={styles.body__item}>
                            <span>8</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>9</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>10</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>11</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>12</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>13</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>14</span>
                        </div>
                    </div>
                    
                    <div className={styles.body__track}>

                        <div className={styles.body__item}>
                            <span>15</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>16</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>17</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>18</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>19</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>20</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>21</span>
                        </div>
                    </div>
                    
                    <div className={styles.body__track}>

                        <div className={styles.body__item}>
                            <span>22</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>23</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>24</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>25</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>25</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>26</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>27</span>
                        </div>
                    </div>
                    <div className={styles.body__track}>

                        <div className={styles.body__item}>
                            <span>28</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>29</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>30</span>
                        </div>
                        <div className={styles.body__item}>
                            <span>31</span>
                        </div>
                        <div className={styles.body__item}>
                            <span></span>
                        </div>
                        <div className={styles.body__item}>
                            <span></span>
                        </div>
                        <div className={styles.body__item}>
                            <span></span>
                        </div>
                    </div>
                    <div style={{position:"absolute" , top:`${top}px` , left:`${left}px`}}>
                    {
                        change
                        ?
                        (<AcaademForm setClose={setChange} setTop={setTop} setLeft={setLeft}/>)
                        :
                        (null)
                    }
                    </div>
                </div>
            </div>
            </div>
        </div>
    </Layout>
  )
}
