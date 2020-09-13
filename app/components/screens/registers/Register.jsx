///////////////////>> MODULS <<///////////////////
import React, {useState} from 'react'
import {View, Text, TextInput, Button, Picker, ImageBackground, TouchableHighlight} from 'react-native'
import {useDispatch} from 'react-redux'

///////////////////>> SCRIPTS <<///////////////////
import style from './styles/RegisterStyle'
import { save_user, send_mail__post } from '../../../redux/actions'
import validate from './supports/Validation_Register'
import * as D from './supports/Date_Register' //Functions to Date Register
import api_adress from './supports/Api_Adress_Register' //Function to Api Adress

///////////////////>> IMAGES <<///////////////////
import Background from '../../../assets/background.png'

//////////////////////////////////////////////////

//----------Leyenda--------
// >> << === TITULO
// --> <-- === SUBTITULO
//hOnCh === handlerOnChange
//secureTextEntry={true} === no mostrar el texto
//keyboardType === darle el un type a los inputs

//dispatch(actions)
//const users = useSelector(state => state.users)

export default ()=>{ 
    const dispatch = useDispatch()

//////////>> STATES <<//////////
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        documentType: 'DNI',
        documentNumber: 0,
        birth: new Date((new Date().getFullYear() - 16), 0, 1),
        phoneNumber: 0,
        password:'',
        address:''
    })
//THIS STATE IS TO HELP US VALIDATE THE INPUTS OF THE USERS
    const [error, setError] = useState({
        firstName: '*',
        lastName:'*',
        documentNumber:'*',
        adress:'*',
        phoneNumber:'*',
        email:'*',
        confirmEmail:'*',
        password:'*',
        confirmPassword:'*'
    })

//THIS STATE IS TO HELP US IN THE DATES
    const [date, setDate] = useState({
        day: 1,
        month: 0,
        year: new Date().getFullYear() - 16
    })

//THIS STATE IS TO HELP US IN THE ADRESS
    const [address, setAddress] = useState({
        street_1: '',
        street_2: ''
    })

////////////////////>> SUPPORTS <<////////////////////

    //////////--> FUNCTIONS <--//////////
    ////--> VERIFY IF HAS A ERROR <--////
    const withoutError = ()=>{
        if(error.firstName || error.lastName || error.phoneNumber 
        || error.documentNumber || error.email  || error.password) return true
        else return false
    } 
    
    const searchDirection = ()=>{
        const street = address.street_1 + ' y ' + address.street_2
        api_adress(street, newUser, setNewUser)
    }

///////////////////>> HANDLER ON CHAGES <<///////////////////

    const hOnCh_NewUser = (e) =>{
        setError(
            validate({
            ...newUser,
            [e.target.name]: e.target.value,
        }));
        
        if (e.target.name != "confirmEmail" || e.target.name != "confirmPassword"){
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
        } 
        console.log(newUser)       
    }

    const hOnCh_Birth = (e) =>{
        const id = e.split('-')
        var type
        switch(parseInt(id[0])){
            case 1:
                type = 'day';
                break;
            case 2:
                type = 'month';
                break;
            case 3:
                type = 'year';
                break;
        }

        setDate({
            ...date,
            [type]: parseInt(id[1])
        })
            
        setNewUser({
            ...newUser,
            birth: new Date(date.year, date.month, date.day)
        })
    }

    const hOnCh_Adress = (e)=>{
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
    }

//////////>> DISPATCH TO REGISTER THE NEW USER <<//////////
    const register = ()=>{
        try{    
            var sendMail = {
                email: newUser.email,
                name: newUser.firstName + " " + newUser.lastName
            }        
            dispatch(send_mail__post(sendMail))
            dispatch(save_user(newUser))
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <ImageBackground source={Background} style={style.container}>
{/*///////////////////////////////////>>> NAME <<<///////////////////////////////////*/}
            {/*//////////////->FIRST NAME<-//////////////*/}
            <Text style={error.firstName ? style.error : style.label}>Name</Text>
            <TextInput style={style.inputR} editable name='firstName' onChange={hOnCh_NewUser}/>
            {/*//////////////->LAST NAME<-//////////////*/}
            <Text style={error.lastName ? style.error : style.label}>Surname</Text>
            <TextInput style={style.inputR} editable name='lastName' onChange={hOnCh_NewUser}/>         
            

{/*///////////////////////////////////>>> DOCUMENT <<<///////////////////////////////////*/}
            <View style={style.docContainer}>
                {/*//////////////->DOCUMENT TYPE<-//////////////*/}
                <View style={style.doc}>
                    <Text style={style.label}>Doc. Type</Text>
                    <Picker style={style.inputDoc}
                    name='documentType' onValueChange={hOnCh_NewUser}>
                        <Picker.Item key={1} label='DNI' value='DNI'/>
                        <Picker.Item key={2} label='Pas' value='Pasaporte'/>
                    </Picker>
                </View>
                {/*//////////////->DOCUMENT NUMBER<-//////////////*/}
                <View style={style.docN}>
                    <Text style={error.documentNumber ? style.error : style.label}>Number</Text>
                    <TextInput style={style.inputDocNum} keyboardType='numeric' editable name='documentNumber' onChange={hOnCh_NewUser}/>
                </View>
            </View>

{/*///////////////////////////////////>>> BIRTH <<<///////////////////////////////////*/}
            <Text style={style.label}>Birth date</Text>
            <View style={style.birth}>
                {/*//////--> DAY <--//////*/}
                <Picker style={style.date} onValueChange={hOnCh_Birth}>
                    {D.daysTotal(date.month).map(day =>{
                        return <Picker.Item key={day} label={day.toString()} value={'1-' + day}/>
                    })}
                </Picker>
                {/*//////--> MONTH <--//////*/}
                <Picker style={style.date} onValueChange={hOnCh_Birth}>
                    {D.months.map(month => {
                        return(
                            //month[0] name's month
                            //month[1] position's month 
                            <Picker.Item key={month[1]} label={month[0]} value={'2-' + month[1]}/>
                        )
                    })}
                </Picker>
                {/*//////--> YEAR <--//////*/}
                <Picker style={style.date} onValueChange={hOnCh_Birth}>
                    {D.yearTotal().map(year => {
                        return <Picker.Item key={year} label={year.toString()} value={'3-' + year}/>
                    })}
                </Picker>
            </View>

{/*///////////////////////////////////>>> ADDRESS <<<///////////////////////////////////*/}
            <Text style={error.adress ? style.error : style.label}>Address</Text>
            <View style={style.adressContainer}>
                <View>
                    <Text style={style.subLabel}>Street 1</Text>
                    <TextInput style={style.inputStreet} editable name='street_1' onChange={hOnCh_Adress}/>
                </View>
                <View>
                    <Text style={style.subLabel}>Street 2</Text>
                    <TextInput style={style.inputStreet} editable name='street_2' onChange={hOnCh_Adress}/>
                </View>
            </View>
            <TouchableHighlight onPress={searchDirection} style={style.appButtonContainer}>
                <Text style={style.appButtonText}>SEARCH</Text>
            </TouchableHighlight>

{/*///////////////////////////////////>>> PHONE NUMBER <<<///////////////////////////////////*/}
            <Text style={error.phoneNumber ? style.error : style.label}>Tel/Cel</Text>
            <TextInput style={style.inputR} keyboardType='numeric' editable name='phoneNumber' onChange={hOnCh_NewUser}/>

{/*///////////////////////////////////>>> EMAIL <<<///////////////////////////////////*/}
            {/*//////////////->EMAIL<-//////////////*/}
            <Text style={error.email ? style.error : style.label}>Email</Text>
            <TextInput style={style.inputR} editable name='email' onChange={hOnCh_NewUser}/>
            {/*//////////////->CONFIRM EMAIL<-//////////////*/}
            <Text style={error.confirmEmail ? style.error : style.label}>Confirm Email</Text>
            <TextInput style={style.inputR} editable name='confirmEmail' onChange={hOnCh_NewUser}/>

{/*///////////////////////////////////>>> PASSWORD <<<///////////////////////////////////*/}
            {/*//////////////->PASSWORD<-//////////////*/}
            <Text style={error.password ? style.error : style.label}>Password</Text>
            <TextInput style={style.inputR} secureTextEntry={true} editable name='password' onChange={hOnCh_NewUser}/>
            {/* /////////////->CONFIRM PASSWORD<-/////////// */}
            <Text style={error.confirmPassword ? style.error : style.label}>Confirm Password</Text>
            <TextInput style={style.inputR} secureTextEntry={true} editable name='confirmPassword' onChange={hOnCh_NewUser}/>

{/*//////////////////////////////////////////////////////////////////////////////////////*/}
            
            <TouchableHighlight onPress={register} style={style.appButtonContainer}>
                <Text style={style.appButtonText}>Send</Text>
            </TouchableHighlight>
        </ImageBackground>
    )
}
