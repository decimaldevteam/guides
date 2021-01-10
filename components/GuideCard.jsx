export default function GuideCard({ guide }){

    return <div className="guide">
        <img src={guide.thumbnail}/>
        <div style={{ padding: '20px' }}>
            <h1>{guide.name}</h1>
            <p>{guide.description}</p>
            <div>
                <a href={`/guide/${guide.file}`}>READ MORE <font>&gt;</font></a>
            </div>
        </div>
    </div>

}