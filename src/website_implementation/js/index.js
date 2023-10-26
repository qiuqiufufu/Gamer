var tags = document.getElementsByClassName('box1');  
        for(var i = 0; i < tags.length; i++) {  
            tags[i].addEventListener('mouseover', function() {  
                for(var j = 0; j < this.children.length; j++) {
					console.log(this.children[1]);
                    this.children[0].style.transform="scale(1.2)"
					this.children[1].style.color="red"
                    if(this.children[j].classList.contains('sp1')) { 
						 
                        this.children[j].style.color = 'red';  
                    }  
                } 
            });  
            tags[i].addEventListener('mouseout', function() {  
                for(var j = 0; j < this.children.length; j++) {
                    this.children[0].style.transform="scale(1)"
					this.children[1].style.color="#999"
                    if(this.children[j].classList.contains('sp1')) {  
                        this.children[j].style.color = 'white';  
                    }  
                }
            });  
        }