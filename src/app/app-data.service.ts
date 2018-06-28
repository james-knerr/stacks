import { InMemoryDbService } from 'angular-in-memory-web-api';

export class AppDataService implements InMemoryDbService {
    createDb() {
        const STACKS = [{
            'id': '0',
            'title': 'Star Wars Art',
            'isDeleted': false
        },
        {
            'id': '1',
            'title': 'Tattoo Ideas',
            'isDeleted': false
        },
        {
            'id': '2',
            'title': 'Misc.',
            'isDeleted': false
        },
    ];
    const STACK_CONTENT = [{
        'id': '0',
        'title': 'Star Wars Art',
        'isDeleted': false,
        'records': [{
            'id': '0',
            'title': 'The Last Jedi Poster',
            'imageUrl': 'https://i.pinimg.com/564x/68/3c/6e/683c6e458b9a26d1b60958408185b1e7.jpg',
            'sourceUrl': 'https://www.instagram.com/p/Bdfb7i0DE-w/',
            'isDeleted': false
        },
        {
            'id': '1',
            'title': 'Luke Skywalker',
            'imageUrl': 'https://i.pinimg.com/564x/d5/a7/21/d5a721bc086ad9c44a0845ab21763479.jpg',
            'sourceUrl': 'https://i.pinimg.com/originals/d5/a7/21/d5a721bc086ad9c44a0845ab21763479.png',
            'isDeleted': false
        },
        {
            'id': '2',
            'title': 'Darth Vader',
            'imageUrl': 'https://i.pinimg.com/564x/75/a2/1c/75a21c641a1e041e7dde87056e71bbdc.jpg',
            'sourceUrl': 'https://i.pinimg.com/originals/75/a2/1c/75a21c641a1e041e7dde87056e71bbdc.png',
            'isDeleted': false
        },
        {
            'id': '3',
            'title': 'Ahsoka Vs Darth Vader',
            'imageUrl': 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/2bfa6c35314369.571acd7ae0d1a.jpg',
            'sourceUrl': 'https://www.behance.net/gallery/35314369/Star-Wars-Ahsoka-Vs-Darth-Vader',
            'isDeleted': false
        },
        {
            'id': '4',
            'title': 'Lightsaber',
            'imageUrl': 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/3066a413794309.5627844ae3c7f.png',
            'sourceUrl': 'https://www.behance.net/gallery/13794309/Star-Wars-Lightsaber',
            'isDeleted': false
        },
        {
            'id': '5',
            'title': 'Battle for Hoth Moon',
            'imageUrl': 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/8eee1e14099719.5627d75233ac7.jpg',
            'sourceUrl': 'https://www.behance.net/gallery/14099719/BATTLE-FOR-HOTH-MOON',
            'isDeleted': false
        },
        {
            'id': '15',
            'title': 'Ahsoka Vs Darth Vader',
            'imageUrl': 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/2bfa6c35314369.571acd7ae0d1a.jpg',
            'sourceUrl': 'https://www.behance.net/gallery/35314369/Star-Wars-Ahsoka-Vs-Darth-Vader',
            'isDeleted': false
        },
        {
            'id': '16',
            'title': 'Lightsaber',
            'imageUrl': 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/3066a413794309.5627844ae3c7f.png',
            'sourceUrl': 'https://www.behance.net/gallery/13794309/Star-Wars-Lightsaber',
            'isDeleted': false
        },
        {
            'id': '17',
            'title': 'Battle for Hoth Moon',
            'imageUrl': 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/8eee1e14099719.5627d75233ac7.jpg',
            'sourceUrl': 'https://www.behance.net/gallery/14099719/BATTLE-FOR-HOTH-MOON',
            'isDeleted': false
        },
        {
            'id': '18',
            'title': 'The Last Jedi Poster',
            'imageUrl': 'https://i.pinimg.com/564x/68/3c/6e/683c6e458b9a26d1b60958408185b1e7.jpg',
            'sourceUrl': 'https://www.instagram.com/p/Bdfb7i0DE-w/',
            'isDeleted': false
        },
        {
            'id': '19',
            'title': 'Luke Skywalker',
            'imageUrl': 'https://i.pinimg.com/564x/d5/a7/21/d5a721bc086ad9c44a0845ab21763479.jpg',
            'sourceUrl': 'https://i.pinimg.com/originals/d5/a7/21/d5a721bc086ad9c44a0845ab21763479.png',
            'isDeleted': false
        },
        {
            'id': '20',
            'title': 'Darth Vader',
            'imageUrl': 'https://i.pinimg.com/564x/75/a2/1c/75a21c641a1e041e7dde87056e71bbdc.jpg',
            'sourceUrl': 'https://i.pinimg.com/originals/75/a2/1c/75a21c641a1e041e7dde87056e71bbdc.png',
            'isDeleted': false
        },
        {
            'id': '21',
            'title': 'Ahsoka Vs Darth Vader',
            'imageUrl': 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/2bfa6c35314369.571acd7ae0d1a.jpg',
            'sourceUrl': 'https://www.behance.net/gallery/35314369/Star-Wars-Ahsoka-Vs-Darth-Vader',
            'isDeleted': false
        },
        {
            'id': '8',
            'title': 'Darth Vader',
            'imageUrl': 'https://i.pinimg.com/564x/75/a2/1c/75a21c641a1e041e7dde87056e71bbdc.jpg',
            'sourceUrl': 'https://i.pinimg.com/originals/75/a2/1c/75a21c641a1e041e7dde87056e71bbdc.png',
            'isDeleted': false
        },
        {
            'id': '6',
            'title': 'The Last Jedi Poster',
            'imageUrl': 'https://i.pinimg.com/564x/68/3c/6e/683c6e458b9a26d1b60958408185b1e7.jpg',
            'sourceUrl': 'https://www.instagram.com/p/Bdfb7i0DE-w/',
            'isDeleted': false
        },
        {
            'id': '7',
            'title': 'Luke Skywalker',
            'imageUrl': 'https://i.pinimg.com/564x/d5/a7/21/d5a721bc086ad9c44a0845ab21763479.jpg',
            'sourceUrl': 'https://i.pinimg.com/originals/d5/a7/21/d5a721bc086ad9c44a0845ab21763479.png',
            'isDeleted': false
        },
        {
            'id': '9',
            'title': 'Ahsoka Vs Darth Vader',
            'imageUrl': 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/2bfa6c35314369.571acd7ae0d1a.jpg',
            'sourceUrl': 'https://www.behance.net/gallery/35314369/Star-Wars-Ahsoka-Vs-Darth-Vader',
            'isDeleted': false
        },
        {
            'id': '10',
            'title': 'Lightsaber',
            'imageUrl': 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/3066a413794309.5627844ae3c7f.png',
            'sourceUrl': 'https://www.behance.net/gallery/13794309/Star-Wars-Lightsaber',
            'isDeleted': false
        },
        {
            'id': '11',
            'title': 'Battle for Hoth Moon',
            'imageUrl': 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/8eee1e14099719.5627d75233ac7.jpg',
            'sourceUrl': 'https://www.behance.net/gallery/14099719/BATTLE-FOR-HOTH-MOON',
            'isDeleted': false
        },
        {
            'id': '12',
            'title': 'The Last Jedi Poster',
            'imageUrl': 'https://i.pinimg.com/564x/68/3c/6e/683c6e458b9a26d1b60958408185b1e7.jpg',
            'sourceUrl': 'https://www.instagram.com/p/Bdfb7i0DE-w/',
            'isDeleted': false
        },
        {
            'id': '13',
            'title': 'Luke Skywalker',
            'imageUrl': 'https://i.pinimg.com/564x/d5/a7/21/d5a721bc086ad9c44a0845ab21763479.jpg',
            'sourceUrl': 'https://i.pinimg.com/originals/d5/a7/21/d5a721bc086ad9c44a0845ab21763479.png',
            'isDeleted': false
        },
        {
            'id': '14',
            'title': 'Darth Vader',
            'imageUrl': 'https://i.pinimg.com/564x/75/a2/1c/75a21c641a1e041e7dde87056e71bbdc.jpg',
            'sourceUrl': 'https://i.pinimg.com/originals/75/a2/1c/75a21c641a1e041e7dde87056e71bbdc.png',
            'isDeleted': false
        },
        {
            'id': '22',
            'title': 'Lightsaber',
            'imageUrl': 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/3066a413794309.5627844ae3c7f.png',
            'sourceUrl': 'https://www.behance.net/gallery/13794309/Star-Wars-Lightsaber',
            'isDeleted': false
        },
        {
            'id': '23',
            'title': 'Battle for Hoth Moon',
            'imageUrl': 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/8eee1e14099719.5627d75233ac7.jpg',
            'sourceUrl': 'https://www.behance.net/gallery/14099719/BATTLE-FOR-HOTH-MOON',
            'isDeleted': false
        },
        {
            'id': '24',
            'title': 'Pup',
            'imageUrl': 'https://images.pexels.com/photos/305225/pexels-photo-305225.jpeg?auto=compress&cs=tinysrgb&h=350',
            'sourceUrl': '',
            'isDeleted': false
        },
        {
            'id': '25',
            'title': 'Trees',
            'imageUrl': 'https://images.pexels.com/photos/851023/pexels-photo-851023.jpeg?auto=compress&cs=tinysrgb&h=350',
            'sourceUrl': '',
            'isDeleted': false
        },
        {
            'id': '26',
            'title': 'Wall',
            'imageUrl': 'https://images.pexels.com/photos/845242/pexels-photo-845242.jpeg?auto=compress&cs=tinysrgb&h=350',
            'sourceUrl': '',
            'isDeleted': false
        }]
    },
    {
        'id': '1',
        'title': 'Tattoo Ideas',
        'isDeleted': false,
        'records': [
        ]
    },
    {
        'id': '2',
        'title': 'Misc.',
        'isDeleted': false,
        'records': [
        ]
    },
];

        return { STACKS, STACK_CONTENT };
    }
}
