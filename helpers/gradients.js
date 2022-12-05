export function getRarityGradient(selectedRarity) {
    var gradientStyle;
    
    if (selectedRarity == "1"){
        gradientStyle = {background: 'linear-gradient(100deg, rgba(26,27,30,1) 48%, rgba(124,134,143,1) 100%)'};
    } 
    else if (selectedRarity == "2"){
        gradientStyle = {background: 'linear-gradient(100deg, rgba(26,27,30,1) 48%, rgba(136,179,150,1) 100%)'};
    } 
    else if (selectedRarity == "3"){
        gradientStyle = {background: 'linear-gradient(100deg, rgba(26,27,30,1) 48%, rgba(73,151,197,1) 100%)'};
    } 
    else if (selectedRarity == "4"){
        gradientStyle = {background: 'linear-gradient(100deg, rgba(26,27,30,1) 48%, rgba(109,55,176,1) 100%)'};
    } else if (selectedRarity == "5"){
        gradientStyle = {background: 'linear-gradient(100deg, rgba(26,27,30,1) 48%, rgba(255,166,0,1) 100%)'};
    }

    return gradientStyle;
}

export function getRarityImage(selectedRarity) {
    return `/resources/${selectedRarity}Star.png`;
}