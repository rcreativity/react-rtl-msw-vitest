import { http, HttpResponse  } from 'msw';

export const handlers = [
    http.get('http://localhost:3000/items', (req, res, ctx) => {
        console.log('Captured a "GET /items" request')
        // return new HttpResponse({ data: [{ id: 1, name: 'Test Item' }] })
        
        // return res(
        //     ctx.status(200),
        //     ctx.json({ data: [{ id: 1, name: 'Test Item' }] })
        // );

        // its working
        return HttpResponse.json({ data: [{ id: 1, name: 'Test Item 1' }] })
    }),
    http.post('http://localhost:3000/items', async ({ request, params, cookies }) => {
        // return res(ctx.json({ data: { id: 2, name: req.body.name } }));
        const requestBody = await request.json();
        const { name } = requestBody;
        console.log('Captured a "GET /items" request', name)
        return HttpResponse.json({ data: { id: 2, name: name } })
    }),
    http.put('http://localhost:3000/items/:id', async ({ request, params, cookies }) => {
        // return res(ctx.json({ data: { id: req.params.id, name: req.body.name } }));

        const requestBody = await request.json();
        const { name } = requestBody;
        console.log('Captured a "PUT or Update /item" request', name, params.id)
        const paramId = parseInt(params.id)
        return HttpResponse.json({ data: { id: paramId, name: name } })
    }),
    http.delete('http://localhost:3000/items/:id', ({ request, params, cookies }) => {
        console.log('Captured a "Delete /item" request', params.id)
        const paramId = parseInt(params.id)
        return HttpResponse.json({ data: { id: paramId, message: "Item deleted" } })
        // return res(ctx.status(200));
    }),
];
