import styled from "styled-components";
 export const AppContainer=styled.div(
    {
        color:(props)=>{
            return props.theme.appColor

        },
        backgroundColor:(props)=>{
           return props.theme.appBackgroundColor

        }

    }
 )
