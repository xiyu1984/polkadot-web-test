
export default function animalHandle(req, res) {
    const { query } = req;
    const { id } = query

    // console.log(req);

    return res.status(200).json({
        'url': `/animal/${id}`,
        'name': id,
        'infomation': 'Hey, this is a cute animal!'
    });
}
