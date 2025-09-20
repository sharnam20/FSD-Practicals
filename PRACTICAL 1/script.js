let vote = {
    Javascript: 0,
    Python: 0,
    Java: 0
};

function votes(language){
    vote[language]++;
    updatevotes();
    drawChart();
}

function updatevotes(){
    document.getElementById("jsvotes").innerHTML = vote.Javascript;
    document.getElementById("pyvotes").innerHTML = vote.Python;
    document.getElementById("jvotes").innerHTML = vote.Java;
}

function drawChart() {
    const canvas = document.getElementById('voteChart');
    const ctx = canvas.getContext('2d');
    const total = vote.Javascript + vote.Python + vote.Java;
    
    if (total === 0) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;
    
    let currentAngle = 0;
    const colors = ['#f7df1e', '#3776ab', '#d73027'];
    const languages = ['Javascript', 'Python', 'Java'];
    
    languages.forEach((lang, index) => {
        const sliceAngle = (vote[lang] / total) * 2 * Math.PI;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[index];
        ctx.fill();
        
        currentAngle += sliceAngle;
    });
}

setInterval(()=> {
    const langs = Object.keys(vote);
    const randomVote = langs[Math.floor(Math.random()*langs.length)];
    vote[randomVote]++;
    updatevotes();
}, 2000);